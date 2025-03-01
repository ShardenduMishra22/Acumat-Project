import { Response } from "express";

export const apiResponse = <T>(res: Response, status: number, message: string, data: T[] = [], token?: string) => {
    res.status(status).json({ message, data, token });
};
