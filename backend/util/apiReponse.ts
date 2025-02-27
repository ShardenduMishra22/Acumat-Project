import { Response } from "express";

export const apiResponse = <T>(res: Response, status: number, message: string, data: T[] = [], token?: string) => {
    return res.status(status).json({ message, data, token });
};
