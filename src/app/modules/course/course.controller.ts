import catchAsync from "../../utils/catchAsync";
import {
  assignFacultiesWithCourseIntoDB,
  createCourseInDB,
  deleteFacultiesWithCourseIntoDB,
  deleteSingleCourseFromDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
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
  const query = req.query;
  const result = await getAllCoursesFromDB(query);

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

export const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateCourseIntoDB(id, req.body);
  res.send({
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

export const assignCourseFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await assignFacultiesWithCourseIntoDB(id, faculties);
  res.send({
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

export const deleteCourseFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await deleteFacultiesWithCourseIntoDB(id, faculties);
  res.send({
    success: true,
    message: "Course Faculty is Deleted successfully",
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
