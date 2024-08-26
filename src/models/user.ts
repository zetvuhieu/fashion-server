import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  refreshToken?: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
