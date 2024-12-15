import mongoose from "mongoose";
import { StudentModel } from "./student.mdel";
import { TStudent } from "./student.interface";

export const getStudentsFromDB = async (query:Record<string, unknown>) => {
  const searchTerm = query.searchTerm || ""; 
  const result = await StudentModel.find({
    $or:["email", "name.lastName","name.firstName", "name.middleName"].map((field)=> ({
      [field]:{$regex: searchTerm, $options:"i"}
    }))
  });
  return result;
};

export const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

export const updateStudentInDB = async (
  id: string,
  studentData: Partial<TStudent>
) => {
  const { name, guardian, ...remainingData } = studentData;
  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result
};

export const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    { $set: { isDeleted: true } }
  );
  return result;
};
