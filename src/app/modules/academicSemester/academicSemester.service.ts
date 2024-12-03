import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

export const createAcademicSemesterIntoDB = async (
  payload: TAcademicSemester
) => {
  const result = await AcademicSemesterModel.create(payload);
  return result;
};
