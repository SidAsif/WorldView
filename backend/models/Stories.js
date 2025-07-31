const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    text: { type: String, required: true },
    images: [{ type: String }],
    author: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
