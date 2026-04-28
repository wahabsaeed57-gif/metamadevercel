// import mongoose from "mongoose";

// import { DB_name } from "../constant.js";

// const connectDb = async () => {
//   console.log("URI:", process.env.MONGODB_URI);

//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}`,
//     );

//     console.log("MongoDB connected:", connectionInstance.connection.host);
//   } catch (error) {
//     console.log("Mongo DB connection error:", error);
//     process.exit(1);
//   }
// };
// console.log(
//   "user model is created by from user and this is the error we show ",
// );

// export default connectDb;

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "metamaid",
    });

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.log("Mongo DB connection error:", error.message);
    throw error;
  }
};

export default connectDb;