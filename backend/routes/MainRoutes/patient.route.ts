import { Router } from "express"
import {
    login,
    register,
    getProfile,
    getHistory,
    getReportAll,
    getReportOne,
    updateProfile
} from "../../controllers/index"

const PatientRouter = Router();

PatientRouter.post("/login", login);
PatientRouter.post("/register", register);

PatientRouter.get("/profile", getProfile);
PatientRouter.get("/history", getHistory);
PatientRouter.get("/report", getReportAll);
PatientRouter.get("/report/:id", getReportOne);

PatientRouter.put("/profile", updateProfile);

export {
    PatientRouter
}