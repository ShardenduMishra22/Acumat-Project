import { Router } from "express";
import { PatientRouter } from "./MainRoutes/patient.route"

const AllRouter = Router();

AllRouter.use("/patient", PatientRouter);

export {
    AllRouter
}