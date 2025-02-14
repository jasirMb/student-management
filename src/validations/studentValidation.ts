import { z } from 'zod';


const addTaskValidation = {
    body: z.object({
      taskName: z.string().min(1, { message: "Task name is required" }),
      description: z.string().min(1, { message: "Description is required" }),
      studentId: z.string().min(1, { message: "Student ID is required" }), 
      dueDate: z.date({ message: "Due date is required" }).refine(date => date > new Date(), {
        message: "Due date must be a future date",
      }),
      status: z.enum(['not-started', 'in-progress', 'completed', 'submitted-late'], {
        message: "Status must be one of the following: 'not-started', 'in-progress', 'completed', or 'submitted-late'",
      }),
      priority: z.enum(['low', 'medium', 'high'], {
        message: "Priority must be one of the following: 'low', 'medium', 'high'",
      }),
    }),
  };


