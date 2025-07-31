const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

// Clerk middleware to extract userId
const requireUser = (req, res, next) => {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  req.userId = userId;
  next();
};

// Save country
router.post("/save", requireUser, async (req, res) => {
  const { countryCode } = req.body;
  const bookmark = await Bookmark.findOne({ userId: req.userId, countryCode });

  if (bookmark) return res.status(200).json({ message: "Already saved" });

  await Bookmark.create({ userId: req.userId, countryCode });
  res.status(201).json({ message: "Country saved" });
});

// Remove country
router.delete("/remove/:countryCode", requireUser, async (req, res) => {
  await Bookmark.deleteOne({
    userId: req.userId,
    countryCode: req.params.countryCode,
  });
  res.status(200).json({ message: "Bookmark removed" });
});

// Get all saved countries for user
router.get("/", requireUser, async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.userId });
  res.json(bookmarks);
});

module.exports = router;
