import express from "express";
import {
  createDoctor,
  getallDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js"

import { upload } from "../middleware/multer_middleware.js";

const router = express.Router();


router.post("/create", upload.single("image"), createDoctor);


router.get("/get-doctors", getallDoctors);

 
router.post(
  "/update",
  verifyJwt,
  upload.single("image"), // 🔥 THIS IS MISSING
  updateDoctorProfile,
);
// router.get("/:id", getDoctorById);


router.put("/:id", updateDoctor);

// DELETE doctor
router.delete("/:id", deleteDoctor);

export default router;
