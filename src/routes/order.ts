import express from "express";
import authenticateToken from "../middlewares/authMiddleware";
import { createOrder, getUserOrders } from "../controllers/orderController";

const router = express.Router();

// Route tạo đơn hàng
router.post("/checkout", authenticateToken, createOrder);
// Route lấy danh sách đơn hàng của người dùng, yêu cầu xác thực
router.get("/orders", authenticateToken, getUserOrders);

export default router;
