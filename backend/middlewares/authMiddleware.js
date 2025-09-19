const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware to protect router
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not Authorized, No Token" });
    }
  } catch (err) {
    res.status(401).json({ message: "token failed", error: err.message });
  }
};

module.exports = { protect }; 
