import { Payment } from "../model/payment.model.js";
import { Appointment } from "../model/appointment.model.js";

// ================= CREATE PAYMENT =================
export const createPayment = async (req, res) => {
  try {
    const { appointmentId, method, amount, transactionId } = req.body;

    if (!appointmentId || !method || !amount) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // check appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // create payment
    const payment = await Payment.create({
      method,
      amount,
      transactionId: transactionId || "",
      isPaid: true,
    });

    // attach payment to appointment
    appointment.payment = payment._id;
    await appointment.save();

    return res.status(201).json({
      success: true,
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL PAYMENTS =================
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PAYMENT BY ID =================
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
