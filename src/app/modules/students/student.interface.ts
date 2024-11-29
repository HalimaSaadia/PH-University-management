import { Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  fatherContact: string;
  motherContact: string;
};

type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id:string;
  name: TStudentName;
  user:Types.ObjectId;
  contact: string;
  emergencyContact: string;
  gender: "male" | "female";
  address: string;
  email: string;
  avatar?: string;
  guardian: TGuardian;
  isDeleted: boolean;
};
