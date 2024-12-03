import { model, Schema } from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterMonths, academicSemesterName } from "./academicSemester.constant";



const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonths,
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
