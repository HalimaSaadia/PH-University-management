import config from "../../config";
import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.mdel";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

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
  user.id = "203010000";
  const newUser = await UserModel.create(user);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);
    return { newStudent, user };
  }
};
