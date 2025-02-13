
import { Router } from "express";
// import catchAsync from "../utils/catchAsync";
// import { authenticate } from "../middleware/auth";
// import admin from './admin.routes'
// import student from './student.routes'
// import auth from './auth.routes'
const router = Router();


router.post('/login', validate(loginValidation), catchAsync(login));

// router.use('/admin', catchAsync(authenticate('admin')),  admin)  

// router.use('/student',catchAsync(authenticate('student')),student)  


export default router;