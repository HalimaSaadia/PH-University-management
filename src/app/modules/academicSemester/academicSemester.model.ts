import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterName,
} from "./academicSemester.constant";


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
      type: String,
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

AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new Error("Semester Already Exist");
  }
  next()
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
