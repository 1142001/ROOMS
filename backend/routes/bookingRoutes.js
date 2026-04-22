import express from "express";
import { bookRoom, getBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
console.log("BOOKING ROUTER LOADED"); // 🔥 debug

router.post("/", verifyToken, bookRoom);
router.get("/", verifyToken, getBookings);

export default router;