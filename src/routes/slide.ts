// src/routes/slideRoutes.ts

import express from "express";
import { createSlide, getSlides } from "../controllers/slideController";
import upload from "../config/multer";

const router = express.Router();

router.post("/slides", upload.single("image"), createSlide);
router.get("/slides", getSlides);

export default router;
