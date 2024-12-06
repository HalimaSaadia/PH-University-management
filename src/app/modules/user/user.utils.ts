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
  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
};

export const generateStudentId = async (academicSemester) => {
  const currentId = (await findLastStudentID()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${academicSemester.year}${academicSemester.code}${incrementId}`;
  return incrementId;
};
