import { UserModel } from "./user.model"

export const getAllUserFromDB = async() => {
const result = await UserModel.find({})
return result
}