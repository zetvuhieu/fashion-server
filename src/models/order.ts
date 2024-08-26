import mongoose, { Document, Schema } from "mongoose";

// Định nghĩa kiểu Item
interface Item {
  productId: mongoose.Types.ObjectId; // ID của sản phẩm từ bảng Product
  quantity: number;
  size?: string | number; // Có thể có hoặc không
  price: number;
  name: string; // Tên sản phẩm
}

// Định nghĩa kiểu Order kế thừa từ Document của Mongoose
interface Order extends Document {
  recipient: {
    name: string;
    address: string;
    phone: string;
  };
  items: Item[];
  totalPrice: number;
  userId: mongoose.Types.ObjectId; // ID của người dùng
  orderDate: Date; // Ngày đặt hàng
}

// Tạo schema cho Order
const OrderSchema: Schema = new Schema({
  recipient: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      size: { type: Schema.Types.Mixed }, // Có thể là string hoặc number
      price: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now }, // Ngày đặt hàng
});

// Export model Order
export default mongoose.model<Order>("Order", OrderSchema);
