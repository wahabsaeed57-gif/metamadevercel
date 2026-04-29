import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialty: {
      type: String,
      default: "",
    },

    hospital: {
      type: String,
      default: "",
    },

    fee: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
