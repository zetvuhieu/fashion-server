import express, { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";

const router: Router = express.Router();

// Routes for categories
router.post("/categories", createCategory);
router.get("/categories", getCategories);

export default router;
