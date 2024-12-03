import { z } from "zod";
import { academicSemesterMonths, academicSemesterName } from "./academicSemester.constant";

export const AcademicSemesterValidation = z.object({
  name: z.enum([...academicSemesterName] as [string, ...string[]], {
    required_error: "Name is required",
  }),
  code: z.enum(["01", "02", "03"], {
    required_error: "Code is required",
  }),
  year: z.date(),
  startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
  endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
});
