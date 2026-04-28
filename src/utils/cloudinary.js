import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "hospital_app", // 👈 important
    });

    // ✅ delete local file AFTER upload
    fs.unlinkSync(localFilePath);

    return response;

  } catch (err) {
    console.log("Cloudinary Error:", err);

    // delete file if error
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadCloudinary };