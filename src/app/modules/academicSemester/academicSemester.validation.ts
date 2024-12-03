import { z } from "zod";

export const AcademicSemesterValidation = z.object({
  name: z.enum(["Autumn", "Summer", "Fall"], {
    required_error: "Name is required",
  }),
  code: z.enum(["01", "02", "03"], {
    required_error: "Code is required",
  }),
  year: z.date(),
  startMonth: z.enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]),
  endMonth: z.enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]),
});


