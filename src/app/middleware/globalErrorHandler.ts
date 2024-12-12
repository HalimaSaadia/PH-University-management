import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import { handleZodError } from "../errors/zodError";
import { handleValidationError } from "../errors/ValidationError";
import { handleCastError } from "../errors/castError";
import { handleDuplicateError } from "../errors/duplicateError";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let status = error.statusCode || 500;
  let message = error.message || "Something Went Wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something Went Wrong!",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    status = simplifiedError.status;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  if(error?.name === "ValidationError"){
    const simplifiedError = handleValidationError(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources

  }

  if(error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources
  }
  if(error?.code === 11000){
    const simplifiedError = handleDuplicateError(error);
    console.log(simplifiedError)
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources
  }
  res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error?.stack : null,
    // error
  });
};
