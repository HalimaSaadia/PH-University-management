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
  isActive:{
    type: String,
    enum:["active", "blocked"]
  },
  status: {
    type: String,
    enum: ["in-progress", "blocked"],
    default: "in-progress",
  },
}, {timestamps:true});

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, Number(config.salt));
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
