import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../students/student.interface";
import { UserModel } from "./user.model";

// const findLastStudentID = async() => {
//   const lastStudent = await UserModel.find()

// }

export const generateStudentId = (academicSemester) => {
  const currentId = (0).toString().padStart(4, "0");
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${academicSemester.year}${academicSemester.code}${incrementId}`;
  return incrementId
};
