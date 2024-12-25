import express from "express";
import { createNewStudent, getAllUser } from "./user.controller";
import createStudentValidationSchema from "../students/student.validation";
import { validateRequest } from "../../utils/validateRequest";
const router = express.Router();

router.get("/", getAllUser);
router.post(
  "/create-student",
  createNewStudent
);

export const userRoute = router;
