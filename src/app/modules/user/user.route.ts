import express from "express"
import { getAllUser } from "./user.controller"
const router = express.Router()

router.get("/", getAllUser)

export  const userRoute = router 