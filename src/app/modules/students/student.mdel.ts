import mongoose, {  Schema, model } from "mongoose";
import { TGuardian, TStudent } from "./student.interface";
import validator from "validator";
import config from "../../config";
import { CallbackError } from "mongoose";

const guardian = new Schema<TGuardian>({
  fatherContact: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: String,
    user:Schema.Types.ObjectId,
    name: {
      firstName: {
        type: String,
        required: true,
        maxLength: 15,
        trim: true,
        validate: {
          validator: function (value: string) {
            return /^[A-Z][a-z]*$/.test(value);
          },
          message: "{VALUE} is not in capitalize format",
        },
      },
      middleName: { type: String },
      lastName: {
        type: String,
        required: true,
        validate: {
          validator: (value: string) => validator.isAlpha(value),
        },
      },
    },
    address: { type: String },
    avatar: { type: String },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "gender is required"],
    },
    guardian: guardian,
    admissionSemester:{type: Schema.Types.ObjectId,ref:"academicSemester"},
    isDeleted: { type: Boolean, default: false },
  },
  {timestamps:true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


studentSchema.virtual("fullname").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
export const StudentModel = model<TStudent>("Student", studentSchema);
