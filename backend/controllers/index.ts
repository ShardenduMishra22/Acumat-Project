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
    verifyHospital
} from "../controllers/MainControllers/hospital.controller"

export {
    login,
    loginP,
    register,
    registerP,
    getProfile,
    getReportAll,
    getReportOne,
    updateProfile,
    verifyPatient,
    verifyHospital,
    getAllNotification,
};