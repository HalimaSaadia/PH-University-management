import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (error:any, req:Request, res:Response, next:NextFunction)=>{
    const status = 500;
    const message = error.message || "Something Went Wrong!"
    res.status(status).json({
      success:false,
      message,
      error
    })
  }