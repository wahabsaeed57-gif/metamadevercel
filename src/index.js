import connectDb from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
import { configureCloudinary } from "./utils/cloudinary.js";


dotenv.config();

const PORT =  6000;

configureCloudinary();
connectDb()
  .then(() => {
    app.on("error", (err) => {
      console.log("server error :", err);
    });
    app.listen(PORT,"0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");
  })
  .catch((error) => {
    console.log("monogo db connection is failed ", error);
  });
