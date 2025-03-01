import { Request, Response } from "express";
import { apiResponse } from "../../util/apiReponse";
import { Error } from "mongoose";
import { Notification } from "../../model";

const getAllNotification = async (req: Request, res: Response) => {
    try {
        const hospitalId = req.body._id;
        const notifications = await Notification.find({hospitalId})

        apiResponse(res, 200, "Success", notifications);
    } catch (error) {
        apiResponse(res, 500, (error as Error).message);
    }
}

export {
    getAllNotification
}