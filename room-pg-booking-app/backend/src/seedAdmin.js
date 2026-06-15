import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Room from "./models/Room.js";

dotenv.config();
await connectDB();

const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

let admin = await User.findOne({ email: adminEmail });

if (!admin) {
  admin = await User.create({
    name: "Admin",
    email: adminEmail,
    password: adminPassword,
    phone: "9999999999",
    isAdmin: true
  });

  console.log(`Admin created: ${adminEmail}`);
} else {
  admin.isAdmin = true;
  await admin.save();
  console.log(`Admin already exists: ${adminEmail}`);
}

const roomCount = await Room.countDocuments();

if (roomCount === 0) {
  await Room.insertMany([
    {
      title: "Girls PG near Station",
      type: "PG",
      location: "Bhiwandi",
      price: 6500,
      gender: "Girls",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      description: "Clean and safe PG with food, Wi-Fi and nearby public transport.",
      facilities: ["Wi-Fi", "Food", "Laundry", "Security"],
      isAvailable: true,
      createdBy: admin._id
    },
    {
      title: "Single Room for Students",
      type: "Room",
      location: "Kalyan",
      price: 5000,
      gender: "Any",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      description: "Affordable single room suitable for students and working professionals.",
      facilities: ["Water", "Parking", "Attached Bathroom"],
      isAvailable: true,
      createdBy: admin._id
    },
    {
      title: "Premium Hostel Room",
      type: "Hostel",
      location: "Thane",
      price: 8500,
      gender: "Boys",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      description: "Premium hostel room with study table, Wi-Fi and security.",
      facilities: ["Wi-Fi", "CCTV", "Study Table", "Housekeeping"],
      isAvailable: true,
      createdBy: admin._id
    }
  ]);

  console.log("Sample rooms added.");
}

process.exit();
