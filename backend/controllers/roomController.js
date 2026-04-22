import Room from "../models/Room.js";
import Booking from "../models/Bookings.js";

// Add Room
export const createRoom = async (req, res) => {
  try {
    const { title, price, location, image } = req.body;

    if (!title || !price || !location) {
      return res.status(400).json("All fields required");
    }

    const room = await Room.create({
      title,
      price,
      location,
      image: image || ""
    });

    res.json(room);
  } catch (err) {
    console.log("CREATE ROOM ERROR:", err);
    res.status(500).json("Server error");
  }
};

// Get all rooms or available rooms
export const getRooms = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    if (!fromDate || !toDate) {
      const rooms = await Room.find();
      return res.json(rooms);
    }

    const bookings = await Booking.find({
      fromDate: { $lte: toDate },
      toDate: { $gte: fromDate }
    });

    const bookedIds = bookings.map((b) => b.roomId);

    const rooms = await Room.find({
      _id: { $nin: bookedIds }
    });

    res.json(rooms);
  } catch (err) {
    console.log("ROOM ERROR:", err);
    res.status(500).json("Server error");
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json("Room deleted");
  } catch (err) {
    console.log("DELETE ROOM ERROR:", err);
    res.status(500).json("Delete failed");
  }
};