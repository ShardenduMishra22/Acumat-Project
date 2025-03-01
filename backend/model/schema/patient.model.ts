import { Schema } from "mongoose";
import { IPatient } from "../Types";

export const patientSchema: Schema<IPatient> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    patientId: {
      type: String,
      required: [true, "Patient ID is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    role: {
      type: String,
      enum: ["Patient"],
      required: [true, "Role is required"],
      default: "Patient",
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
  },
  { timestamps: true }
);
