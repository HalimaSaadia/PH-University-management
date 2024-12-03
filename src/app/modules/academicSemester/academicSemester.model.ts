import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ["Autumn", "Summer", "Fall"],
      required: true,
    },
    code: {
      type: String,
      enum: ["01", "02", "03"],
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: [
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
      ],
    },
    endMonth: {
      type: String,
      enum: [
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
      ],
    },
  },

  {
    timestamps: true,
  }
);

export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
