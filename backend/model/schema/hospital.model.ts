import { Schema } from "mongoose";
import { IHospital } from "./Type/data.type";


export const hospitalSchema: Schema<IHospital> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    hospitalId: {
      type: String,
      required: [true, "Hospital ID is required"],
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
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    cases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Case",
      },
    ],
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    role: {
      type: String,
      enum: ["Hospital"],
      required: [true, "Role is required"],
      default: "Hospital",
    },
  },
  { timestamps: true }
);
