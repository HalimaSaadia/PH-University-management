import { Router } from "express";
import { createAcademicSemester } from "./academicSemester.controller";
import { validateRequest } from "../../utils/validateRequest";
import createStudentValidationSchema from "../students/student.validation";

const router = Router();
router.post(
  "/create-academic-semester",
  validateRequest(createStudentValidationSchema),
  createAcademicSemester
);

export const academicSemesterRoute = router