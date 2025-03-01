import { Schema } from "mongoose";
import { IReport } from "../Types";

export const reportSchema: Schema<IReport> = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: [true, "Case ID is required"],
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
    },
    document: {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true }
);