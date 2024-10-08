// src/routes/productRoutes.ts

import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  searchProductsByName,
} from "../controllers/productsController";
import upload from "../config/multer";

const router = express.Router();

router.post("/products", upload.single("image"), createProduct);
router.get("/products", getProducts);
router.get("/products/search", searchProductsByName);
router.get("/products/:id", getProductById);

export default router;
