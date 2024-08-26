import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Đặt giá trị secret key trực tiếp trong mã
const secretKey = "mysecretkey"; // Thay thế bằng giá trị bí mật của bạn

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Nếu không có token, trả về lỗi 401

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về lỗi 403
    req.user = user; // Lưu thông tin người dùng vào req.user
    next();
  });
};

export default authenticateToken;
