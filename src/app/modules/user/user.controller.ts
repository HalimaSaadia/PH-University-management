import { NextFunction, Request, RequestHandler, Response } from "express";
import { createNewStudentInDB, getAllUserFromDB } from "./user.service";


const catchAsync = (fn:RequestHandler) => {
  return (req:Request, res:Response, next:NextFunction)=> {
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
  }
 
}

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

export const createNewStudent  = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const { password, student: studentData } = req.body;
    const result = await createNewStudentInDB(password, studentData);
    res.status(200).send({
      success: true,
      message: "Successfully Created Student",
      data: result,
    });
 
})
