import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5001, () => console.log("🚀 Server running on 5001"));