import { z } from "zod";

const coursePreRequisiteValidationSchema = z.object({
    course: z.string(), 
    isDeleted: z.boolean().optional()
})

export const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(coursePreRequisiteValidationSchema).optional()
  }),
});
