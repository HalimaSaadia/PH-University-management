import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

export const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate("academicSemester"),
    query
  ).filter().paginate()
  const result = await SemesterRegistrationModel.find({});
  return result;
};
export const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

export const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExist = await AcademicSemesterModel.findById(
    academicSemester
  );
  const isSemesterRegistered = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (!isAcademicSemesterExist) {
    throw new AppError(404, "Invalid Id. Academic Semester Not Found");
  }
  if (isSemesterRegistered) {
    throw new AppError(404, "Semester is Already Exist");
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
