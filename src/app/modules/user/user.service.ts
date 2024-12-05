import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.mdel";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

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
 
  user.id = generateStudentId(admissionSemester);
  const newUser = await UserModel.create(user);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);
    return newStudent
  }
};
