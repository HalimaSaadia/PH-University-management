import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
} from "./semesterRegistration.service";

export const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = await getAllSemesterRegistrationsFromDB(query);
    res.status(200).send({
      success: true,
      message: "Successfully Retrieve  Semester Registrations",
      data: result,
    });
  }
);
export const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleSemesterRegistrationFromDB(id);
    res.status(200).send({
      success: true,
      message: "Successfully Retrieve  Semester Registration",
      data: result,
    });
  }
);

export const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createSemesterRegistrationIntoDB(req.body);
    res.status(200).send({
      success: true,
      message: "Successfully Created  Semester Registration",
      data: result,
    });
  }
);
