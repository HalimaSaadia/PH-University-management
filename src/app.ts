import express, { NextFunction, Request, Response } from "express"
const app = express()
import cors from 'cors'
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFound } from "./app/middleware/notFound"
import router from "./app/routes"

app.use(express.json())
app.use(cors())

app.use("/api", router)

// const test = async(req:Request, res:Response) => {
// Promise.reject()
// }
// test()
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.use(globalErrorHandler)
app.use(notFound)
export default app

