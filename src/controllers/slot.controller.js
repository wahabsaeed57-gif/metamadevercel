import { Slot } from "../model/slot.model.js";

// ================= CREATE SLOT =================
export const createSlot = async (req, res) => {
  try {
    const { day, date, time } = req.body;

    if (!day || !date || !time) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const slot = await Slot.create({
      day,
      date,
      time,
      isBooked: false,
    });

    return res.status(201).json({
      success: true,
      message: "Slot created successfully",
      slot,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL SLOTS =================
export const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      slots,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE SLOT =================
export const getSlotById = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    return res.status(200).json({
      success: true,
      slot,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE SLOT =================
export const updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Slot updated",
      slot,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE SLOT =================
export const deleteSlot = async (req, res) => {
  try {
    await Slot.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Slot deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= TOGGLE BOOKED STATUS =================
export const toggleSlotStatus = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    slot.isBooked = !slot.isBooked;
    await slot.save();

    return res.status(200).json({
      success: true,
      message: "Slot status updated",
      slot,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
