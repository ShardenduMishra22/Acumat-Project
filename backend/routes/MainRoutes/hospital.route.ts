import { Router } from "express"
import { HospitalMiddleware } from "../../middleware/hospital.middleware";
import { login, register, verifyHospital } from "../../controllers/index";

const HospitalRouter = Router();

HospitalRouter.post("/login", login);
HospitalRouter.post("/register", register);
HospitalRouter.post("/verifyHospital,",HospitalMiddleware ,verifyHospital);

export {
    HospitalRouter
}