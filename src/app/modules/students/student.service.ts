import mongoose from "mongoose";
import { StudentModel } from "./student.mdel";
import { TStudent } from "./student.interface";

export const getStudentsFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};

export const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id })
    .populate("admissionSemester")
    .populate({ path: "academicDepartment" ,
      populate:{
        path:"academicFaculty"
      }
    });
  return result;
};

export const updateStudentInDB = async(id:string, studentData:Partial<TStudent> )=>{

}

export const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    { $set: { isDeleted: true } }
  );
  return result;
};

