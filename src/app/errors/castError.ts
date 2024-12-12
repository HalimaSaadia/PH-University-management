import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

export const handleCastError = (err: mongoose.Error.CastError) => {
    const status = 400;
    const errorSources:TErrorSource = [
        {
          path:err.path,
          message:err.message  
        }
    ]

    return {
      status,
      message: "Cast  Error",
      errorSources,
    };
}