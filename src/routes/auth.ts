import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/authController";

const router: Router = express.Router();

// Route for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;
