import mongoose, { Schema, Document } from "mongoose";

export interface ISlide extends Document {
  title: string;
  image: string;
}

const slideSchema: Schema = new Schema({
  title: { type: String, require: true },
  image: { type: String, require: true },
});
export default mongoose.model<ISlide>("Slide", slideSchema);
