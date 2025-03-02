import { model } from 'mongoose';
import { caseSchema } from './schema/cases.model';
import { reportSchema } from './schema/report.model';
import { patientSchema } from './schema/patient.model';
import { hospitalSchema } from './schema/hospital.model';
import { documentSchema } from './schema/document.model';
import { notificationSchema } from './schema/notication.model';
import { ICase, IDocument, IHospital, INotification, IPatient, IReport } from './Type/data.type';

const Case = model<ICase>('Case', caseSchema);
const Report = model<IReport>('Report', reportSchema);
const Patient = model<IPatient>('Patient', patientSchema);
const Hospital = model<IHospital>('Hospital', hospitalSchema);
const Document = model<IDocument>('Document', documentSchema);
const Notification = model<INotification>('Notification', notificationSchema);

export { Case, Report, Patient, Document, Hospital, Notification };
