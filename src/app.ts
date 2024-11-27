import express, { Request, Response } from "express"
const app = express()
import cors from 'cors'
import { userRoute } from "./app/modules/user/user.route"

app.use(express.json())
app.use(cors())

app.use("/v1/users", userRoute)
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app

