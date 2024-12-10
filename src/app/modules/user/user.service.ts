import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.mdel";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../../errors/AppError";

export const getAllUserFromDB = async () => {
  const result = await UserModel.find({});
  return result;
};

export const createNewStudentInDB = async (
  password: string,
  studentData: TStudent
) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);
  user.role = "student";
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester
  );
  if (!admissionSemester) {
    throw new AppError(404, "Semester Not Found");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = await generateStudentId(admissionSemester as TAcademicSemester);
    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create User");
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
