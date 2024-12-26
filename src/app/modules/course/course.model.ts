import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./Course.interface";
import { string } from "zod";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  preRequisiteCourse: [preRequisiteCoursesSchema]
});

export const courseModel =   model<TCourse>("Course", courseSchema)
