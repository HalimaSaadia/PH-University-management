import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";



export const handleValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  const status = 400;

  const errorSources: TErrorSource = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error.path,
        message: error.message,
      };
    }
  );

  return {
    status,
    message: "Zod Validation Error",
    errorSources,
  };
};
