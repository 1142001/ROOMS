import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["Room", "PG", "Hostel"],
      default: "PG"
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["Boys", "Girls", "Any"],
      default: "Any"
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    },
    description: {
      type: String,
      required: true
    },
    facilities: [String],
    isAvailable: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
