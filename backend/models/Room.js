import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  image: String // ✅ NEW FIELD
});

export default mongoose.model("Room", roomSchema);