import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { StudentModel } from './student.mdel'

// export const createStudentInDB = async (data: TStudent) => {
//   try {
//     const studentData = new StudentModel(data)
//     const result = await studentData.save()
//     return result
//   } catch (error) {
//     console.error('Error saving student data:', error)
//     throw error
//   }
// }

export const getStudentsFromDB = async () => {
  const result = await StudentModel.find({})
  return result
}
export const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
  // ])
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
