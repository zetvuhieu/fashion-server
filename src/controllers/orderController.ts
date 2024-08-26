import { Request, Response } from "express";
import Order from "../models/order";

// Tạo đơn hàng mới
export const createOrder = async (req: Request, res: Response) => {
  try {
    // Lấy thông tin người dùng từ req.user
    const userId = req.user?.id;

    const { recipient, items, totalPrice } = req.body;

    // Kiểm tra thông tin đơn hàng
    if (!recipient || !items || !totalPrice) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      recipient,
      items,
      totalPrice,
      userId, // Lưu ID người dùng vào đơn hàng
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await newOrder.save();

    // Trả về thông tin đơn hàng đã tạo
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi tạo đơn hàng" });
  }
};

// Lấy danh sách đơn hàng của người dùng
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    // Lấy userId từ req.user (được gán bởi middleware xác thực)
    const userId = req.user?.id;

    // Tìm các đơn hàng của người dùng đó
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Trả về danh sách đơn hàng
    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách đơn hàng" });
  }
};
