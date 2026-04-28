import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ================= TRANSPORTER =================
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be Gmail App Password
  },
});

// ================= VERIFY CONNECTION =================
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email server error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ================= SEND EMAIL FUNCTION =================
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent successfully");
  } catch (error) {
    console.log("❌ Email Error:", error);
    throw new Error("Email not sent");
  }
};
