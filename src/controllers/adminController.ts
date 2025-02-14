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
        return res.status(201).json({ message: "Student added successfully." });
    } catch (error) {
        console.error("Error adding student:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const createStudentTask = async (req:Request,res:Response) => {
    console.log(req.body);
    const {taskName,description,studentId,dueDate,priority} = req.body

    // const student = User.findById(studentId)
    // if(!student) res.status(300).json({message:"no"})
    // const task = new TaskAssignment({
    //     taskname,description,studentId,dueDate,priority
    // })
    // task.save();
    // res.status(200).json({message:"dfsd"})
    
}
