import { Doctor } from "../model/doctor.model.js";
import { User } from "../model/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

// ================= CREATE DOCTOR =================
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      specialty,
      experience,
      fee,
      hospital,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !specialty ||
      !experience ||
      !fee
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // upload image
    let imageUrl = "";
    if (req.file?.path) {
      const uploaded = await uploadCloudinary(req.file.path);
      imageUrl = uploaded?.secure_url;
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
      role: "doctor",
      profileImage: imageUrl,
    });

    // create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      specialty,
      experience,
      fee,
      hospital,
      address,
      rating: 0, // default
    });

    const result = await Doctor.findById(doctor._id).populate(
      "user",
      "name email profileImage phone",
    );

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL DOCTORS =================
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "user",
      "name email profileImage phone",
    );

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE DOCTOR =================
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "name email profileImage phone",
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE DOCTOR =================
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user", "name email profileImage phone");

    return res.status(200).json({
      success: true,
      message: "Doctor updated",
      doctor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= DELETE DOCTOR =================
export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Doctor deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
