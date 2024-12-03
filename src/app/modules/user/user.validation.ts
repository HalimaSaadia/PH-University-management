import {z} from "zod"

export const userValidationSchema = z.object({
    password: z.string().max(20, {message: "Password Length can not be more than 20"}),
    role:z.enum(["admin", "student", "faculty"], {
        invalid_type_error:"Role Must be in String"
    }),
    needsPasswordChange:z.boolean().optional(),
    status:z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted:z.boolean().default(false)
})