import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    console.log(process.env.CONNECTION_STRING);
    await mongoose.connect(process.env.CONNECTION_STRING as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
