import { Schema } from 'mongoose';
import { IReport } from '../Type/data.type';

export const reportSchema: Schema<IReport> = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: 'Case',
      required: [true, 'Case ID is required'],
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required'],
    },
    documentId: {
      type: Schema.Types.ObjectId,
      ref: 'Document',
    },
    timeOfLastNormal: {
      type: Date,
      required: [true, 'Time of last normal is required'],
    },
    symptoms: {
      type: [String],
      required: [false, 'Symptoms are required'],
    },
    BP: {
      type: String,
      required: [false, 'Heart Rate is not required'],
    },
    O2_Saturation: {
      type: String,
      required: [false, 'Heart Rate is not required'],
    },
    HR: {
      type: String,
      required: [false, 'Heart Rate is not required'],
    },
  },
  {
    timestamps: true,
  }
);
