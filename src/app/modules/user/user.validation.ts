import {z} from "zod"
import { TUser } from "./user.interface"


export const userValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, {message: "Password Length can not be more than 20"}),
    role:z.enum(["admin", "student", "faculty"]),
    needsPasswordChange:z.boolean().optional(),
    status:z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted:z.boolean().default(false)
})