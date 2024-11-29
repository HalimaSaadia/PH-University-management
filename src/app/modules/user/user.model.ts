import { CallbackError, model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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
    default: "in-progress",
  },
});

userSchema.pre("save", async function (next) {
  try {
    console.log(this.password)
    this.password = await bcrypt.hash(this.password, Number(config.salt));
    console.log(this.password)
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

userSchema.post("save", function () {
  this.password = "";
});

export const UserModel = model<TUser>("User", userSchema);
