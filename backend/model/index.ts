import { model } from "mongoose";
import { caseSchema } from "./schema/cases.model";
import { reportSchema } from "./schema/report.model";
import { patientSchema } from "./schema/patient.model";
import { documentSchema } from "./schema/document.model";
import { hospitalSchema } from "./schema/hospital.model";
import { ICase, IDocument, IHospital, IPatient, IReport } from "./Types";

const Case = model<ICase>("Case", caseSchema);
const Report = model<IReport>("Report", reportSchema);
const Patient = model<IPatient>("Patient", patientSchema);
const Hospital = model<IHospital>("Hospital", hospitalSchema);
const Document = model<IDocument>("Document", documentSchema);

export {
    Case,
    Report,
    Patient,
    Hospital,
    Document,
}