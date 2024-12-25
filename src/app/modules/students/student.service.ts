import mongoose from "mongoose";
import { StudentModel } from "./student.mdel";
import { TStudent } from "./student.interface";

export const getStudentsFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query.searchTerm || "";
  const queryObj = { ...query };
  const excludedFields = ["searchTerm", "limit", "page","fields"];
  excludedFields.forEach((field) => delete queryObj[field]);
  const searchQuery = StudentModel.find({
    $or: ["name", "name.firstName", "name.middleName", "name.lastName"].map(
      (field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })
    ),
  });
  const filterQuery = searchQuery.find(queryObj);
  const page = query.page || 1;
  const limit = Number(query.limit) || 1;
  const skip = Number(page) * limit;
  const paginateQuery = filterQuery.skip(skip);
  const limitQuery =  paginateQuery.limit(Number(limit));
 const fields  = query?.fields ? query.fields.split(",").join(" ")  : "-__v"

 const fieldQuery = await limitQuery.select(fields)
  return fieldQuery;
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

  return result;
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
