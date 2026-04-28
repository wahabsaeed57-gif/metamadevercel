import connectDb from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT =  6000;

connectDb()
  .then(() => {
    app.on("error", (err) => {
      console.log("server error :", err);
    });
    app.listen(PORT,"0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("monogo db connection is failed ", error);
  });
