// src/config/db.ts

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = "mongodb://localhost:27017/fashion_db";
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
