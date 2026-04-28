import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },

    amount: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    transactionId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);
