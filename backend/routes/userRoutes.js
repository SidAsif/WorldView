// routes/userRoutes.js
const express = require("express");
const clerkAuth = require("../middleware/clerkAuth");
const User = require("../models/User");
const { users } = require("@clerk/clerk-sdk-node");

const router = express.Router();

// Example: Protected route
router.get("/profile", clerkAuth, async (req, res) => {
  try {
    const user = await users.getUser(req.userId); // Clerk user
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

module.exports = router;
