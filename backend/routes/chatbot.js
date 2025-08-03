const express = require("express");
const router = express.Router();
const axios = require("axios");
const rateLimit = require("express-rate-limit");

// Rate Limiter
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests. Please wait a minute." },
});

// POST /chat - Chat endpoint with improvements
router.post("/", chatLimiter, async (req, res) => {
  let { countryName, question } = req.body;

  countryName = countryName?.trim();
  question = question?.trim();

  if (!countryName || !question) {
    return res.status(400).json({ error: "Missing or invalid parameters." });
  }

  // System prompt
  const systemPrompt = `
You are WorldView, a friendly and knowledgeable AI assistant focused on global travel and geography.

Your job is to answer questions ONLY about the country: ${countryName}.

If the user asks about a different country, politely redirect them by saying:
"I'm currently set to answer questions about ${countryName} only."

When answering:
- Use clear, plain English.
- If asked for facts or lists, format them using numbers (e.g., 1., 2., 3.) or dashes (-).
- DO NOT use:
  • Markdown
  • HTML
  • Emojis
  • Asterisks (*) or backticks (\`)

Examples of correct output:
- "1. Russia was founded in 862 by Rurik."
- "France is known for the Eiffel Tower and its cuisine."

Always keep your tone friendly and informative.
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // model: "google/gemma-3n-e4b-it",
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "WorldView",
        },
        timeout: 15000,
      }
    );

    const answer =
      response.data.choices?.[0]?.message?.content || "No answer found.";
    res.json({ answer });
  } catch (error) {
    console.error(
      "OpenRouter API error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

module.exports = router;
