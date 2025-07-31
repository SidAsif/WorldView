// middleware/clerkAuth.js
const { requireAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = async (req, res, next) => {
  try {
    const session = await requireAuth({ req });
    req.userId = session.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = clerkAuth;
