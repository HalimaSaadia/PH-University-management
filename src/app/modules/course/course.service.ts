import { TCourse } from "./Course.interface";
import { courseModel } from "./course.model";

export const createCourseInDB = async (data: TCourse) => {
  const result = await courseModel.create(data);
  return result;
};

export const getAllCoursesFromDB = async () => {
  const result = await courseModel.find();
  return result;
};

export const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};

export const deleteSingleCourseFromDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};
