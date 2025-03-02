import {
    loginP,
    registerP,
    getProfile,
    verifyPatient,
    getReportAll,
    getReportOne,
    updateProfile
} from './MainControllers/patient.controller';

import {
    getAllNotification
} from "../controllers/MainControllers/general.controller"

import{
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
} from "../controllers/MainControllers/hospital.controller"

export {
    login,
    loginP,
    register,
    postCase,
    registerP,
    getProfile,
    deleteCase,
    updateCase,
    postReport,
    getAllCases,
    updateReport,
    deleteReport,
    postDocument,
    getReportAll,
    getReportOne,
    updateProfile,
    verifyPatient,
    getUniqueCase,
    getReportsOne,
    verifyHospital,
    getDocumentOne,
    updateDocument,
    deleteDocument,
    emergencyActivate,
    getAllNotification,
};