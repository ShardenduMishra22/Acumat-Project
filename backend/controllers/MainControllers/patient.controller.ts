import { Request, Response } from "express";
import { apiResponse } from "../../util/apiReponse";

const register = async (req: Request, res: Response) => {
    try{
        const {} = req.body;

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const login = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getReportAll = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getReportOne = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getHistory = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getProfile = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}


export {
    login,
    register,
    getProfile,
    getHistory,
    getReportAll,
    getReportOne,
    updateProfile
}