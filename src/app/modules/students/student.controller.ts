import { NextFunction, Request, Response } from "express";
import {
  deleteStudentFromDB,
  getSingleStudentFromDB,
  getStudentsFromDB,
} from "./student.service";
import catchAsync from "../../utils/catchAsync";

export const getStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getStudentsFromDB();
    res.send({
      success: true,
      message: "Retrieve Student Data Successfully",
      data: result,
    });
  }
);
export const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSingleStudentFromDB(req.params.id);
    res.send({
      success: true,
      message: "Retrieve Student Data Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteStudentFromDB(req.params.id);
    res.send({
      success: true,
      message: "Retrieve Student Data Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
