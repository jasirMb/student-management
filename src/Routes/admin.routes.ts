import { Router } from "express";
import { addStudent, createStudentTask } from "../controllers/adminController";
import catchAsync from "../helpers/catchAsync";
import validate from "../middlewares/validation";
import { addStudentValidation, addTaskValidation } from "../validations/adminValidation";

const router = Router();

router.post('/add-student',validate(addStudentValidation),catchAsync (addStudent));
router.post('/add-task',validate(addTaskValidation),catchAsync (createStudentTask))
 

 export default router