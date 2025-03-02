import { Router } from 'express';
import { HospitalMiddleware } from '../../middleware/hospital.middleware';
import {
  login,
  register,
  postCase,
  deleteCase,
  updateCase,
  postReport,
  getAllCases,
  updateReport,
  deleteReport,
  postDocument,
  getUniqueCase,
  getReportsOne,
  verifyHospital,
  getDocumentOne,
  updateDocument,
  deleteDocument,
  emergencyActivate,
} from '../../controllers/index';

const HospitalRouter = Router();

HospitalRouter.get('/getAllCases', HospitalMiddleware, getAllCases);
HospitalRouter.get('/getUniqueCase/:id', HospitalMiddleware, getUniqueCase);
HospitalRouter.get('/getReportsOne/:id', HospitalMiddleware, getReportsOne);
HospitalRouter.get('/getDocumentOne/:id', HospitalMiddleware, getDocumentOne);

HospitalRouter.post('/login', login);
HospitalRouter.post('/register', register);
HospitalRouter.post('/postCase', HospitalMiddleware, postCase);
HospitalRouter.post('/postReport', HospitalMiddleware, postReport);
HospitalRouter.post('/postDocument', HospitalMiddleware, postDocument);
HospitalRouter.post('/verifyHospital,', HospitalMiddleware, verifyHospital);
HospitalRouter.post('/emergencyActivate', HospitalMiddleware, emergencyActivate);

HospitalRouter.put('/updateCase/:id', HospitalMiddleware, updateCase);
HospitalRouter.put('/updateReport/:id', HospitalMiddleware, updateReport);
HospitalRouter.put('/updateDocument/:id', HospitalMiddleware, updateDocument);

HospitalRouter.delete('/deleteCase/:id', HospitalMiddleware, deleteCase);
HospitalRouter.delete('/deleteReport/:id', HospitalMiddleware, deleteReport);
HospitalRouter.delete('/deleteDocument/:id', HospitalMiddleware, deleteDocument);

export { HospitalRouter };
