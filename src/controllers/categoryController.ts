import { Request, Response } from "express";
import Category, { ICategory } from "../models/category";

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory: ICategory = new Category({ name });
    const savedCategory: ICategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Could not create category" });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Could not fetch categories" });
  }
};
