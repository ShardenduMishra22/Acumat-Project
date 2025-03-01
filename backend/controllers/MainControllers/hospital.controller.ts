import { apiResponse } from "../../util/apiReponse";
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
    try{
        const { fullName, hospitalId, email, password, phoneNumber, address } = req.body;
        
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

const verifyHospital = async (req: Request, res: Response) => {
    try{

    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

export{
    login,
    register,
    verifyHospital
}