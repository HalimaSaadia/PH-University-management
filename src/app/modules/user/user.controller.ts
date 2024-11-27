import { Request, Response } from "express";
import { getAllUserFromDB } from "./user.service";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserFromDB();
    res.status(200).send({
      success: true,
      message: "Successfully Retrieved Users Data",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong!",
      error: err,
    });
  }
};
