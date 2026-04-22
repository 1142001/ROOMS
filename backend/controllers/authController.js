import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    const { password: _, ...safeUser } = user._doc;
    res.json(safeUser);

  } catch (err) {
    console.log("REGISTER ERROR:", err); // 
    console.log("BODY:", req.body); // 🔥 IMPORTANT
    res.status(500).json("Server error");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.json({ user, token });

  } catch (err) {
    res.status(500).json(err.message);
  }
};