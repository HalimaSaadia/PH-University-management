import { Router } from "express";
import { validateRequest } from "../../utils/validateRequest";
import { courseUpdateValidationSchema, courseValidationSchema } from "./course.validation";
import {
  assignCourseFaculty,
  createCourse,
  deleteCourseFaculty,
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
router.put("/:id/assign-course-faculties", assignCourseFaculty);
router.put("/:id/delete-course-faculties", deleteCourseFaculty);

export const CoursesRoutes = router;
