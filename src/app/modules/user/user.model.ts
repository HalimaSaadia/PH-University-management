import { Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: {
        type:String,
        required:true
    },
    password: {
        type: String, 
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "student", "faculty"],
        required:true
    }
})