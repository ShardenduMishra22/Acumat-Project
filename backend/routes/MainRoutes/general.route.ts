import {  Router } from 'express';
import { getAllNotification } from '../../controllers/index';
import { HospitalMiddleware } from '../../middleware/hospital.middleware';

const GeneralRouter = Router();

GeneralRouter.get('/all',HospitalMiddleware ,getAllNotification);

export {
    GeneralRouter
}