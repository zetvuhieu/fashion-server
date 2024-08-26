// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

// Đăng ký người dùng
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser: IUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Phản hồi thành công
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng nhập người dùng
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Người dùng không tồn tại." });
      return;
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu không chính xác." });
      return;
    }

    // Tạo accessToken và refreshToken
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string, // Sử dụng JWT_SECRET từ .env
      { expiresIn: "15m" } // Thời gian hết hạn của accessToken
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string, // Sử dụng REFRESH_TOKEN_SECRET từ .env
      { expiresIn: "7d" } // Thời gian hết hạn của refreshToken
    );

    // Lưu refreshToken vào cơ sở dữ liệu
    user.refreshToken = refreshToken;
    await user.save();

    // Gửi phản hồi
    res.status(200).json({
      message: "Đăng nhập thành công.",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
};

// Làm mới accessToken
export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Refresh token không được cung cấp." });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Người dùng không tồn tại." });
    }

    if (user.refreshToken !== token) {
      return res.status(403).json({ message: "Refresh token không hợp lệ." });
    }

    // Tạo accessToken mới
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .json({ message: "Refresh token không hợp lệ hoặc đã hết hạn." });
  }
};
