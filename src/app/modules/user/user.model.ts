import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student", "faculty"],
    required: true,
  },
  needsPasswordChange: Boolean,
  isDeleted: Boolean,
  status: {
    type: String,
    enum: ["in-progress", "blocked"],
  }
});

export const UserModel = model<TUser>("User", userSchema);
