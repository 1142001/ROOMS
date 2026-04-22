import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json("No token");

  const token = authHeader.split(" ")[1]; // ✅ important

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json("Invalid token");
  }
};


export const isAdmin = (req, res, next) => {
  console.log("USER:", req.user); // 🔥 debug

  if (!req.user?.isAdmin) {
    return res.status(403).json("Admin only");
  }

  next();
};