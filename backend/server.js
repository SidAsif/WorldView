require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

// Import routes
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmark");
const chatbotRouter = require("./routes/chatbot");
const StoryRoutes = require("./routes/stories");
const imagekitRoutes = require("./routes/imagekit");
const subscribeRoute = require("./routes/subscribe");
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://theworldviews.netlify.app",
  })
);
app.use(express.json());
app.use(
  ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log("Mongo connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/chat", chatbotRouter);
app.use("/api/stories", StoryRoutes);
app.use("/api/imagekit", imagekitRoutes);
app.use("/api/subscribe", subscribeRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
