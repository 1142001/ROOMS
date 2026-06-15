import express from "express";
import { createBooking, getAllBookings, getMyBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/admin", protect, adminOnly, getAllBookings);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
