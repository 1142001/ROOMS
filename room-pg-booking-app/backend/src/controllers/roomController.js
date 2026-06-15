import Room from "../models/Room.js";

const defaultRoomImage = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

const makeFacilitiesArray = (facilities) => {
  if (Array.isArray(facilities)) return facilities;

  return String(facilities || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getRooms = async (req, res) => {
  try {
    const { keyword = "", location = "", type = "", gender = "", minPrice, maxPrice } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } }
      ];
    }

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (gender) query.gender = gender;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const rooms = await Room.find(query).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { title, type, location, price, gender, image, description, facilities, isAvailable } = req.body;

    if (!title || !location || !price || !description) {
      return res.status(400).json({ message: "Title, location, price and description are required." });
    }

    const room = await Room.create({
      title,
      type,
      location,
      price,
      gender,
      image: image || defaultRoomImage,
      description,
      facilities: makeFacilitiesArray(facilities),
      isAvailable,
      createdBy: req.user._id
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    const fields = ["title", "type", "location", "price", "gender", "image", "description", "isAvailable"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) room[field] = req.body[field];
    });

    if (!room.image) room.image = defaultRoomImage;
    if (req.body.facilities !== undefined) room.facilities = makeFacilitiesArray(req.body.facilities);

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    await room.deleteOne();
    res.json({ message: "Room deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
