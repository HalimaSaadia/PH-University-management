import { Router } from "express";
import { studentRoute } from "../modules/students/student.route";
import { userRoute } from "../modules/user/user.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.router";

const router = Router()

router.use("/students", studentRoute)
router.use("/users",userRoute)
router.use("/academic-semesters",academicSemesterRoute)

export default router