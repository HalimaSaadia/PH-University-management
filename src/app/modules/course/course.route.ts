import { Router } from "express";
import { validateRequest } from "../../utils/validateRequest";
import { courseUpdateValidationSchema, courseValidationSchema } from "./course.validation";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
} from "./course.controller";

const router = Router();
router.get("/", getAllCourses);
router.post(
  "/create-course",
  validateRequest(courseValidationSchema),
  createCourse
);

router.get("/:id", getSingleCourse);
router.put("/:id", validateRequest(courseUpdateValidationSchema), updateCourse);

export const CoursesRoutes = router;
