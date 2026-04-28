import express from "express";
import {
  createSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
  toggleSlotStatus,
} from "../controllers/slot.controller.js";

const router = express.Router();

// CREATE slot
router.post("/create", createSlot);

// GET all slots
router.get("/", getAllSlots);

// GET single slot
router.get("/:id", getSlotById);

// UPDATE slot
router.put("/:id", updateSlot);

// DELETE slot
router.delete("/:id", deleteSlot);

// TOGGLE booked/unbooked
router.patch("/toggle/:id", toggleSlotStatus);

export default router;
