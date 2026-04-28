import {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
} from "../controllers/Auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {Router} from "express"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJwt,logoutUser)
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);


export default router