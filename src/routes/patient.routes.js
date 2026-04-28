import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

// CREATE patient
router.post("/create", createPatient);

// GET all patients
router.get("/", getAllPatients);

// GET single patient
router.get("/:id", getPatientById);

// UPDATE patient
router.put("/:id", updatePatient);

// DELETE patient
router.delete("/:id", deletePatient);

export default router;
