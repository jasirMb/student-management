import { z } from 'zod';


 const assignedTasksListValidation = {
    params: z.object({
        studentId: z.string().min(1, { message: "Student ID is required" }),
    }),
    query: z.object({
        page: z.number().int().positive().default(1),
        limit: z.number().int().positive().default(20),
    }),
};


const updateTaskStatusValidation = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    taskId: z.string().min(1, "Task ID is required"),
    status: z.enum(["pending", "overdue", "completed"]),
});

export {
    assignedTasksListValidation, updateTaskStatusValidation
}
