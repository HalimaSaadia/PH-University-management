import { ZodError } from "zod";

export   const handleZodError = (err: ZodError) => {
    const status = 400;
    const errorSources = err.issues.map((issue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      status,
      message: "Zod Validation Error",
      errorSources,
    };
  };