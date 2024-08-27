// src/controllers/productController.ts

import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import upload from "../config/multer";

// Tạo mới product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price, description } = req.body;
    const image = req.file.path; // Đường dẫn đến file ảnh đã upload
    const newProduct: IProduct = new Product({
      name,
      category,
      price,
      description,
      image,
    });
    const savedProduct: IProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: "Could not create product" });
  }
};

// Lấy product
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, priceRange } = req.query;
    const query: any = {};
    if (category) {
      query.category = category as String;
    }
    if (priceRange) {
      switch (priceRange as string) {
        case "under1m":
          query.price = { $lt: 1000000 };
          break;
        case "1m-3m":
          query.price = { $gte: 1000000, $lte: 3000000 };
          break;
        case "over3m":
          query.price = { $gt: 3000000 };
          break;
        default:
          break;
      }
    }
    const products: IProduct[] = await (Object.keys(query).length > 0
      ? Product.find(query).populate("category")
      : Product.find());
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Could not fetch products" });
  }
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Could not fetch product" });
  }
};

// Tìm kiếm sản phẩm theo tên
export const searchProductsByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    // Kiểm tra tham số tên
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "Name query parameter is required and must be a string",
      });
    }

    // Tìm kiếm sản phẩm theo tên
    const products: IProduct[] = await Product.find({
      name: { $regex: name, $options: "i" }, // 'i' để tìm kiếm không phân biệt hoa thường
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching products by name:", error.message);
    res.status(500).json({ error: "Could not search products by name" });
  }
};
