//AUTHENTICATE TOKEN
const jwt = require("jsonwebtoken");

const authenticateManagerToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  if (req.user.role !== "manager" || req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    next();
  });
};

module.exports = authenticateManagerToken;
