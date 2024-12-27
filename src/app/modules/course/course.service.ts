import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse, TCourseFaculty } from "./course.interface";
import { courseFacultyModel, courseModel } from "./course.model";
import { AppError } from "../../errors/AppError";

export const createCourseInDB = async (data: TCourse) => {
  const result = await courseModel.create(data);
  return result;
};

export const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "prefix"];
  const courseQuery = new QueryBuilder(
    courseModel.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(searchableFields)
    .filter()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

export const getSingleCourseFromDB = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate("preRequisiteCourses.course");
  return result;
};

export const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>
) => {
  const { preRequisiteCourses, ...remainingData } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedData = await courseModel.findOneAndUpdate(
      { _id: id },
      remainingData,
      {
        runValidators: true,
        session,
      }
    );
    if (!updatedData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Dat");
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrerequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        { session, upsert: true }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Dat");
      }

      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { session, upsert: true }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Data");
      }
    }

    const result = await courseModel
      .findById(id)
      .populate("preRequisiteCourses.course");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Data");
  }
};

export const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      course:id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

export const deleteFacultiesWithCourseIntoDB = async (id: string, payload:Partial<TCourseFaculty>) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: {faculties: {$in: payload}}
    },
    {
      new: true,
    }
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
