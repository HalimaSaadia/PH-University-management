import express, { NextFunction, Request, Response } from "express"
const app = express()
import cors from 'cors'
import { userRoute } from "./app/modules/user/user.route"
import { studentRoute } from "./app/modules/students/student.route"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"

app.use(express.json())
app.use(cors())

app.use("/api/students", studentRoute)
app.use("/api/users", userRoute)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.use(globalErrorHandler)
export default app

