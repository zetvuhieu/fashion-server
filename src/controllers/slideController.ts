// src/controllers/slideController.ts

import { Request, Response } from "express";
import Slide, { ISlide } from "../models/slide";
import upload from "../config/multer";

export const createSlide = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const image = req.file.path;

    const newSlide: ISlide = new Slide({
      title,
      image,
    });

    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy tất cả các slide
export const getSlides = async (req: Request, res: Response): Promise<void> => {
  try {
    const slides: ISlide[] = await Slide.find();
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error.message);
    res.status(500).json({ error: "Could not fetch slides" });
  }
};
