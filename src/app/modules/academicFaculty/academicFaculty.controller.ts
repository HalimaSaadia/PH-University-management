import catchAsync from "../../utils/catchAsync";
import {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
} from "./academicFaculty.service";

export const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await createAcademicFacultyIntoDB(req.body);

  res.status(200).send({
    success: true,
    message: "Academic faculty is created successfully",
    data: result,
  });
});

export const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await getAllAcademicFacultiesFromDB();

  res.status(200).send({
    success: true,
    message: "Academic faculty is Retrieve successfully",
    data: result,
  });
});

export const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await getSingleAcademicFacultyFromDB(facultyId);

  res.status(200).send({
    success: true,
    message: "Academic faculty is Retrieve successfully",
    data: result,
  });
});

export const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await updateAcademicFacultyIntoDB(facultyId, req.body);

  res.status(200).send({
    success: true,
    message: "Academic faculty is Updated successfully",
    data: result,
  });
});
