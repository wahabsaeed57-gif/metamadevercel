import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "../controllers/Auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {Router} from "express"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJwt,logoutUser)
 router.post("/forgot-password", forgotPassword);
 router.post("/verify-otp", verifyOtp);
 router.post("/reset-password", resetPassword);


export default router