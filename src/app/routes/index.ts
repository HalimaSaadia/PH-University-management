import { Router } from "express";
import { studentRoute } from "../modules/students/student.route";
import { userRoute } from "../modules/user/user.route";

const router = Router()

router.use("/students", studentRoute)
router.use("/users",userRoute)

export default router