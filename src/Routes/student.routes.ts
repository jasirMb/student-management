import { Router } from "express";
import { getAssignedTasks, updateTaskStatus } from "../controllers/studentController";
import catchAsync from "../helpers/catchAsync";
import validate from "../middlewares/validation";
import {assignedTasksListValidation, updateTaskStatusValidation} from "../validations/studentValidation"


const router = Router();

router.get('/get-tasks/:studentId',validate(assignedTasksListValidation),catchAsync(getAssignedTasks));
router.put('/update-task-status',validate({ body: updateTaskStatusValidation }),catchAsync(updateTaskStatus));


export default router;