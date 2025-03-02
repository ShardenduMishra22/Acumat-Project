import { Router } from 'express';
import {
  login,
  register,
  getProfile,
  getReportAll,
  getReportOne,
  updateProfile,
  verifyPatient,
} from '../../controllers/index';
import { PatientMiddleware } from '../../middleware/patient.middleware';

const PatientRouter = Router();

PatientRouter.post('/login', login);
PatientRouter.post('/register', register);
PatientRouter.post('/verifyPatient,', PatientMiddleware, verifyPatient);

PatientRouter.get('/profile', PatientMiddleware, getProfile);
PatientRouter.get('/report', PatientMiddleware, getReportAll);
PatientRouter.get('/report/:id', PatientMiddleware, getReportOne);

PatientRouter.put('/profile', PatientMiddleware, updateProfile);

export { PatientRouter };
