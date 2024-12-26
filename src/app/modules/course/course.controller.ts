import catchAsync from "../../utils/catchAsync";
import {
  createCourseInDB,
  deleteSingleCourseFromDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
} from "./course.service";

export const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseInDB(req.body);

  res.status(200).send({
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

export const getAllCourses = catchAsync(async (req, res) => {
  const result = await getAllCoursesFromDB();

  res.status(200).send({
    success: true,
    message: "Academic faculty is Retrieve successfully",
    data: result,
  });
});

export const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleCourseFromDB(id);

  res.status(200).send({
    success: true,
    message: "Course is Retrieve successfully",
    data: result,
  });
});

export const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSingleCourseFromDB(id);

  res.status(200).send({
    success: true,
    message: "Course is Deleted successfully",
    data: result,
  });
});


