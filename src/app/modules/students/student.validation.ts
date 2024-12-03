import mongoose from "mongoose";
import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    user: z
      .string()
      .refine((value) => mongoose.isValidObjectId(value), {
        message: "Invalid ObjectId",
      })
      .transform((value) => new mongoose.Types.ObjectId(value)),
    name: z.object({
      firstName: z
        .string()
        .min(1)
        .max(15)
        .regex(/^[A-Z][a-z]*$/)
        .trim(),
      middleName: z.string().optional(),
      lastName: z.string().regex(/^[a-zA-Z]+$/),
    }),
    address: z.string(),
    avatar: z.string().optional(),
    contact: z.string(),
    email: z.string().email(),
    emergencyContact: z.string(),
    gender: z.enum(["male", "female"]),
    guardian: z.object({
      fatherContact: z.string(),
      fatherName: z.string(),
      fatherOccupation: z.string(),
      motherName: z.string(),
      motherContact: z.string(),
      motherOccupation: z.string(),
    }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export default createStudentValidationSchema;
