import { Request, Response } from "express";
import User from "../models/userModel";
import TaskAssignment from "../models/taskModel";

export const addStudent = async (req: Request, res: Response) => {
    const { name, email, department, password, role } = req.body;

    try {
        const existingStudent = await User.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        const newStudent = new User({
            name,
            email,
            department,
            password,
            role: role || "student", 
        });

        await newStudent.save();
        return res.status(201).json({ message: "Student added successfully.",newStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const createStudentTask = async (req: Request, res: Response) => {
    try {
        const { taskName, description, studentId, dueDate, priority } = req.body;

        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const task = await new TaskAssignment({ taskName, description, studentId, dueDate, priority }).save();
        
        res.status(201).json({ message: "Task assigned successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
