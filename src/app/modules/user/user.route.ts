import express from "express"
import { createNewStudent, getAllUser } from "./user.controller"
const router = express.Router()

router.get("/", getAllUser)
router.post("/create-student", createNewStudent)

export  const userRoute = router 