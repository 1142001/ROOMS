import express from "express";
import {
  createRoom,
  getRooms,
  deleteRoom
} from "../controllers/roomController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", verifyToken, isAdmin, createRoom);
router.delete("/:id", verifyToken, isAdmin, deleteRoom);

export default router;