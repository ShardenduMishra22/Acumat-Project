import { Router } from "express";
import { PatientRouter } from "./MainRoutes/patient.route";
import { GeneralRouter } from "./MainRoutes/general.route";

const AllRouter = Router();

AllRouter.use("/patient", PatientRouter);
AllRouter.use("/notification", GeneralRouter);

export {
    AllRouter
}