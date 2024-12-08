import catchAsync from "../../utils/catchAsync";
import {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
} from "./academicDepartment.service";

export const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await createAcademicDepartmentIntoDB(req.body);

  res.send({
    success: true,
    message: "Academic department is created successfully",
    data: result,
  });
});

export const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await getAllAcademicDepartmentsFromDB();

  res.send({
    success: true,
    message: "Academic departments are retrieved successfully",
    data: result,
  });
});

export const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await getSingleAcademicDepartmentFromDB(departmentId);

  res.send({
    success: true,
    message: "Academic department is retrieved successfully",
    data: result,
  });
});

export const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await updateAcademicDepartmentIntoDB(
      departmentId,
      req.body
    );

res.send({
    success: true,
    message: "Academic department is updated successfully",
    data: result,
})
});

