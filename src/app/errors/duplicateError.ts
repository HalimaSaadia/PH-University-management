import { TErrorSource } from "../interface/error";
 
export const handleDuplicateError = (err:any) => {
    const status = err?.status || 400
   const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources:TErrorSource = [{
        path:"",
        message:extractedMessage
    }]
    return {
        status,
        message: "Duplicate Key!",
        errorSources,
      };
}