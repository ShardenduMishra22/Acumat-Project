import { Router } from 'express';
import { GeneralRouter } from './MainRoutes/general.route';
import { PatientRouter } from './MainRoutes/patient.route';
import { HospitalRouter } from './MainRoutes/hospital.route';

const AllRouter = Router();

AllRouter.use('/patient', PatientRouter);
AllRouter.use('/hospital', HospitalRouter);
AllRouter.use('/notification', GeneralRouter);

export { AllRouter };
