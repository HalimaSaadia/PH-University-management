import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createAcademicSemesterIntoDB } from "./academicSemester.service";

export const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicSemesterIntoDB(req.body);
    res.status(200).send({
      success: true,
      message: "Successfully Created Academic Semester",
      data: result,
    });
  }
);
