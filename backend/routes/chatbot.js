const express = require("express");
const axios = require("axios");
const router = express.Router();

// Test route
// router.get("/test", (req, res) => {
//   res.send("Chatbot route is working!");
// });

// chatbot route
router.post("/", async (req, res) => {
  const { countryName, question } = req.body;

  if (!countryName || !question) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  try {
    const systemPrompt = `You are a helpful assistant with detailed knowledge about countries. Focus your answers on ${countryName}.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3n-e4b-it", //
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
          "HTTP-Referer": "http://localhost:3000", // Optional: frontend domain
          "X-Title": "WorldView", // Optional: project title
        },
      }
    );

    const answer = response.data.choices[0].message.content;
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
