import express from "express";
import {
  createDoctor,
  getallDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";

import { upload } from "../middleware/multer_middleware.js";

const router = express.Router();


router.post("/create", upload.single("image"), createDoctor);


router.get("/get-doctors", getallDoctors);


// router.get("/:id", getDoctorById);


router.put("/:id", updateDoctor);

// DELETE doctor
router.delete("/:id", deleteDoctor);

export default router;
