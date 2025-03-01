import { Document, Types } from "mongoose";

export interface IPatient extends Document {
  email: string;
  gender: string;
  role: "Patient";
  password: string;
  fullName: string;
  patientId: string;
  phoneNumber: string;
}

export interface IHospital extends Document {
  email: string;
  status: string;
  address: string;
  password: string;
  fullName: string;
  hospitalId: string;
  cases: Types.ObjectId[];
}

export interface ICase extends Document {
  patientId: Types.ObjectId;
  hospitalId: Types.ObjectId;
  status: "Pending" | "Approved" | "Rejected";
}

export interface IDocument extends Document {
  documentUrl: string;
  documentName: string;
  caseId: Types.ObjectId;
  patientId: Types.ObjectId;
  documentType: "pdf" | "doc" | "docx" | "image";
}

export interface IReport extends Document {
  caseId: Types.ObjectId;
  image?: Types.ObjectId;
  patientId: Types.ObjectId;
  document?: Types.ObjectId;
}


// That’s a solid observation. It really comes down to your app’s query patterns. Keeping documents and reports in their own collections and referencing the case with a caseId is a classic normalized approach, making them independent and easier to manage. However, if you’re often fetching a case along with its related documents and reports, embedding their IDs directly in the case document as arrays can speed up lookups. It's all about weighing the trade-offs between normalization (flexibility and smaller document sizes) and denormalization (query performance and convenience).