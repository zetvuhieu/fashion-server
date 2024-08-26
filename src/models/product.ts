import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: mongoose.Schema.Types.ObjectId;
  price: number;
  description: string;
  image: string;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", productSchema);
