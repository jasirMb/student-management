import { Request,Response } from "express";
import tasks from "../models/taskModel"


export const getAssignedTasks = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const assignedTasks = await tasks.find({ studentId });

        if (!assignedTasks.length) {
            return res.status(404).json({ message: "No tasks assigned to this student" });
        }

        res.status(200).json({ tasks: assignedTasks });
    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { studentId, taskId, status } = req.body;
        const validStatuses = ["pending", "completed", "overdue"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const task = await tasks.findOne({ _id: taskId, studentId });

        if (!task) {
            return res.status(404).json({ message: "Task not found for this student" });
        }

        if (task.status === "completed") {
            return res.status(403).json({ message: "Completed tasks cannot be modified" });
        }

        if (task.status === status) {
            return res.status(200).json({ message: "No changes made, task already has this status" });
        }

        task.status = status;
        task.updatedAt = new Date();
        await task.save();

        return res.status(200).json({ message: "Task status updated successfully", updatedTask: task });
    } catch (error) {
        console.error("Error updating task status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



