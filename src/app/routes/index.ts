import { Router } from "express";
import { studentRoute } from "../modules/students/student.route";
import { userRoute } from "../modules/user/user.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.router";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";


const router = Router()
router.use("/students", studentRoute)
router.use("/users",userRoute)
router.use("/academic-semesters",academicSemesterRoute)
router.use("/academic-faculty",AcademicFacultyRoutes)
router.use("/academic-department",AcademicDepartmentRoutes)
router.use("/faculties",FacultyRoutes)

export default router