const jwt = require("jsonwebtoken"); // Ensure this is imported at the top of your file
require("dotenv").config();

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "JWT token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: "JWT token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token is invalid or expired" });
  }
};

module.exports = ensureAuthenticated;
