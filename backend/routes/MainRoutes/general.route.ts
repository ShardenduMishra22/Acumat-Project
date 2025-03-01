import {  Router } from 'express';
import { getAllNotification } from '../../controllers';

const GeneralRouter = Router();

GeneralRouter.get('/all',getAllNotification);

export {
    GeneralRouter
}