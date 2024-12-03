import mongoose from 'mongoose'
import { StudentModel } from './student.mdel'

export const getStudentsFromDB = async () => {
  const result = await StudentModel.find({})
  return result
}

export const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({_id:id})
  return result
}

export const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    { $set: { isDeleted: true } },
  )
  return result
}
