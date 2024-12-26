import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";

export const createCourseInDB = async (data: TCourse) => {
  const result = await courseModel.create(data);
  return result;
};

export const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "prefix"];
  const courseQuery = new QueryBuilder(courseModel.find().populate('preRequisiteCourses.course'), query)
    .search(searchableFields)
    .filter()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

export const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel.findById(id).populate('preRequisiteCourses.course');
  return result;
};

export const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const {preRequisiteCourses, ...remainingData} = payload
  const result = await courseModel.findOneAndUpdate(
    { _id: id },
    remainingData,
    {
      new: true,
      runValidators:true
    },
  );
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
