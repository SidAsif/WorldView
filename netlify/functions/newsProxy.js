const axios = require("axios");

exports.handler = async function (event) {
  const API_KEY = process.env.NEWS_API_KEY;
  const query = event.queryStringParameters.q || "technology";

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("NewsAPI error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
