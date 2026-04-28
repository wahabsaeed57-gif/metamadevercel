import { Patient } from "../model/patient.model.js";
import { User } from "../model/user.model.js";

// ================= CREATE PATIENT =================
export const createPatient = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 1️⃣ Create User
    const user = await User.create({
      name,
      email,
      password,
      role: "patient",
    });

    // 2️⃣ Create Patient
    const patient = await Patient.create({
      user: user._id,
      name,
      email,
      phone,
    });

    const result = await Patient.findById(patient._id).populate(
      "user",
      "name email role",
    );

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL PATIENTS =================
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "name email role");

    return res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE PATIENT =================
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "user",
      "name email role",
    );

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PATIENT =================
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user", "name email role");

    return res.status(200).json({
      success: true,
      message: "Patient updated",
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE PATIENT =================
export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Patient deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
