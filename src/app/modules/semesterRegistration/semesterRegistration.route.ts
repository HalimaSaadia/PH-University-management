import { Router } from "express";

import {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
} from "./semesterRegistration.controller";
import { createSemesterRegistrationValidationSchema } from "./semesterRegistration.validation";
import { validateRequest } from "../../utils/validateRequest";

const router = Router();
router.get("/", getAllSemesterRegistration);
router.get("/:id", getSingleSemesterRegistration);
router.post("/create-semester-registration",validateRequest(createSemesterRegistrationValidationSchema), createSemesterRegistration);

export const SemesterRegistrationRoute = router;
