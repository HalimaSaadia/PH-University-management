import { Router } from "express";
import { validateRequest } from "../../utils/validateRequest";
import { courseValidationSchema } from "./course.validation";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
} from "./course.controller";

const router = Router();
router.get("/", getAllCourses);
router.post(
  "/create-course",
  validateRequest(courseValidationSchema),
  createCourse
);

router.get("/:id", getSingleCourse);

export const CoursesRoutes = router;
