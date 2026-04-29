import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ================= CONFIG =================
export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// ================= UPLOAD FUNCTION =================
export const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "hospital_app",
    });

    // delete file after upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (err) {
    console.log("❌ Cloudinary Error:", err);

    // cleanup file even if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};
