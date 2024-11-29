import { NextFunction, Request, Response } from "express";
import { createNewStudentInDB, getAllUserFromDB } from "./user.service";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllUserFromDB();
    res.status(200).send({
      success: true,
      message: "Successfully Retrieved Users Data",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const createNewStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await createNewStudentInDB(password, studentData);
    res.status(200).send({
      success: true,
      message: "Successfully Created Student",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
