import Booking from "../models/Bookings.js";

export const bookRoom = async (req, res) => {
  try {
    const { roomId, fromDate, toDate } = req.body;

    if (!roomId || !fromDate || !toDate) {
      return res.status(400).json("All fields required");
    }

    const booking = await Booking.create({
      roomId,
      userId: req.user.id,
      fromDate,
      toDate
    });

    res.json(booking);
  } catch (err) {
    console.log("BOOKING ERROR:", err);
    res.status(500).json("Booking failed");
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .populate("userId");

    res.json(bookings);
  } catch (err) {
    console.log("GET BOOKINGS ERROR:", err);
    res.status(500).json("Failed to fetch bookings");
  }
};