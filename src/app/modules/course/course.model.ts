import { model, Schema } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

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
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const courseModel = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
  ],
});

export const courseFacultyModel = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
