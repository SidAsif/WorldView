// routes/imagekit.js

const express = require("express");
const router = express.Router();
const { getAuthParameters } = require("../utils/imagekit");

// Optionally, you can add middleware here for authentication (e.g., Clerk)
// Example: router.use(requireAuth);

router.get("/auth", (req, res) => {
  // Generate and send signature, token, expire, and publicKey for client-side uploads
  const params = getAuthParameters();
  res.json(params);
});

module.exports = router;
