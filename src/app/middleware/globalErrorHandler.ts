import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler :ErrorRequestHandler = (error, req, res, next)=>{
    let status = error.statusCode || 500;
    let message = error.message || "Something Went Wrong!"

    type TErrorSource = {
      path: string | number,
      message:string

    }[]

    const errorSource:TErrorSource = [{
      path:"",
      message:"Something Went Wrong!"
    }]

    if(error instanceof ZodError){
     status=400;
     message="Ami Zod Error"
    }

    res.status(status).json({
      success:false,
      message,
      errorSource,
      error
    })
  }