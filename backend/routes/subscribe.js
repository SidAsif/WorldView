// routes/subscribe.js
const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const validator = require("validator");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid email address." });
  }

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, msg: "You are already subscribed." });
    }

    // Save subscriber
    await Subscriber.create({ email });

    return res
      .status(200)
      .json({ success: true, msg: "Subscription successful!" });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ success: false, msg: "Server error." });
  }
});

module.exports = router;
