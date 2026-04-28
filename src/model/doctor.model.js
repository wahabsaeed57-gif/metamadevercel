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
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    fee: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    experience: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
