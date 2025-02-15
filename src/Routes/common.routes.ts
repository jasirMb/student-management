
import { Router } from "express";
import validate from "../middlewares/validation";
import loginValidation from "../validations/loginValidation";
import { login } from "../controllers/authController";
import catchAsync from "../helpers/catchAsync";
import { authMiddleware } from "../middlewares/authMiddleware";
import adminRouter from "../Routes/admin.routes"
import studentRouter from "../Routes/student.routes"

const router = Router();


router.post('/login', validate(loginValidation),catchAsync(login));
router.use('/admin', catchAsync(authMiddleware('admin')),adminRouter);
router.use('/student',catchAsync (authMiddleware('student')),studentRouter)


export default router;