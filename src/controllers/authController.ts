import { Request, Response } from "express";
import User, { IUser } from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  console.log(req.body);
 try {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("found", existingUser);
    const isMatch = await existingUser.comparePassword(password as string);
    if (isMatch) {
      const token = jwt.sign(
        { id: existingUser._id, role: existingUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        message: "Login successful",
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    return res.status(404).json({ message: "No user found with this email" });
  }
} catch (error) {
    console.log("error on login",error)
    res.status(500).json({message:"internal server error"});
}
};
