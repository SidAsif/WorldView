const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  countryCode: { type: String, required: true },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
