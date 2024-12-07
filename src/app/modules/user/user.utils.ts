import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentID = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({ createdAt: -1 });
  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (
  academicSemester: TAcademicSemester
) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentID();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterCode = academicSemester?.code;
  const currentStudentSemesterYear = academicSemester?.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear === currentStudentSemesterYear
  ) {
   
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${academicSemester.year}${academicSemester.code}${incrementId}`;
  return incrementId;
};
