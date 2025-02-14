import { z } from 'zod';

const addStudentValidation = {
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    department: z.string().optional(),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    role: z.enum(['admin', 'student'], { message: "Role must be either 'admin' or 'student'" }).refine(val => val === 'student', {
      message: "Role must be 'student' for this validation",
    }),
  }),
};

const addTaskValidation = {
    body: z.object({
      taskName: z.string().min(1, { message: "Task name is required" }),
      description: z.string().min(1, { message: "Description is required" }),
      studentId: z.string().min(1, { message: "Student ID is required" }), 
      dueDate: z.string().min(1, "Due date is required"), 
      priority: z.enum(['low', 'medium', 'high'], {
        message: "Priority must be one of the following: 'low', 'medium', 'high'",
      }),
    }),
  };

export {addStudentValidation, addTaskValidation }