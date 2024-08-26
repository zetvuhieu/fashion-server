// src/server.ts

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import cors from "cors";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/products";
import slideRoutes from "./routes/slide";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/order";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Kết nối đến MongoDB
connectDB();

// Sử dụng body-parser middleware để xử lý JSON
app.use(bodyParser.json());

// Sử dụng CORS middleware
app.use(cors());

// Sử dụng các routes
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", slideRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
