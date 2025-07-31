const express = require("express");
const router = express.Router();
const Story = require("../models/Stories");

// Create a new story
router.post("/", async (req, res) => {
  try {
    const { country, text, images, author } = req.body;
    if (!country || !text || !author)
      return res.status(400).json({ error: "Missing required fields" });
    if (!images || !Array.isArray(images) || images.length === 0)
      return res.status(400).json({ error: "At least one image is required" });
    if (images.length > 6)
      return res.status(400).json({ error: "Maximum 6 images allowed" });
    const story = await Story.create({ country, text, images, author });

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all stories, newest first
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// Edit story
router.put("/:id", async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!story) return res.status(404).json({ error: "Not found" });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete story
router.delete("/:id", async (req, res) => {
  try {
    const s = await Story.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
