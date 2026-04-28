import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request - No token",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

 
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    // 4. req me user attach karo
    req.user = user;

    next(); // move to next controller
  } catch (error) {
    return res.status(401).json({
      message: "Token expired or invalid",
    });
  }
};
