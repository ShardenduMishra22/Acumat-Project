import { apiResponse } from "../../util/apiReponse";
import { Patient, Report } from "../../model";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const register = async (req: Request, res: Response) => {
    try {
        const { fullName, patientId, email, password, phoneNumber, gender } = req.body;

        if (!fullName || !patientId || !email || !password || !phoneNumber || !gender) {
            return apiResponse(res, 400, "Please fill all fields");
        }

        const patientExists = await Patient.findOne({ email });
        if (patientExists) {
            return apiResponse(res, 400, "Patient already exists");
        }

        if (password.length < 8) {
            return apiResponse(res, 400, "Password should be at least 8 characters long");
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            return apiResponse(res, 400, "Please enter a valid 10-digit phone number");
        }

        const genSalt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const newPatient = new Patient({
            email,
            gender,
            fullName,
            patientId,
            phoneNumber,
            password: hashedPassword,
        });

        await newPatient.save();
        newPatient.password = "Hidden for Security Reasons";

        return apiResponse(res, 201, "Patient Registered Successfully", [newPatient]);
    } catch (err) {
        console.error("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
};

const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return apiResponse(res, 400, "Please fill all fields");
        }

        const patient = await Patient.findOne({email});
        if(!patient){
            return apiResponse(res, 404, "Patient not found");
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if(!isMatch){
            return apiResponse(res, 400, "Invalid Credentials");
        }

        const token = jwt.sign(
            {
                id: patient._id,
                role: patient.role
            }, 
            process.env.JWT_SECRET as string, 
            {expiresIn: "30d"}
        );

        patient.password = "Hidden for Security Reasons";
        return apiResponse(res, 200, "Patient Logged In Successfully", [patient,token]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const verifyPatient = async (req: Request, res: Response) => {
    try{
        const { _id, role } = req.body;

        if(role !== "Patient"){
            return apiResponse(res, 401, "Unauthorized Access");
        }

        const patient = await Patient.findById({_id});
        if(!patient){
            return apiResponse(res, 404, "Patient not found");
        }

        return apiResponse(res, 200, "Patient Verified Successfully", [patient]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getReportAll = async (req: Request, res: Response) => {
    try{
        const { _id } = req.body;
        const reports = await Report.find({patientId: _id});

        if(!reports){
            return apiResponse(res, 404, "No Reports Found");
        }

        return apiResponse(res, 200, "Reports Found Successfully", [reports]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getReportOne = async (req: Request, res: Response) => {
    try{

        const { _id } = req.body;
        const reportId = req.params.id;
        const report = await Report.findOne({patientId:_id, reportId});

        if(!report){
            return apiResponse(res, 404, "Report not found");
        }

        return apiResponse(res, 200, "Report Found Successfully", [report]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const getProfile = async (req: Request, res: Response) => {
    try{
        const { _id } = req.body;
        const patient = await Patient.findById({ _id });

        if(!patient){
            return apiResponse(res, 404, "Patient not found");
        }

        return apiResponse(res, 200, "Patient Found Successfully", [patient]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try{
        const { _id, fullName, email, phoneNumber } = req.body;
        const patient = await Patient.findById({ _id });

        if(!patient){
            return apiResponse(res, 404, "Patient not found");
        }

        patient.phoneNumber = phoneNumber || patient.phoneNumber;
        patient.fullName = fullName || patient.fullName;
        patient.email = email || patient.email;

        await patient.save();
        return apiResponse(res, 200, "Patient Updated Successfully", [patient]);
    }catch(err){
        console.log("There was an Error", err);
        apiResponse(res, 500, "Internal Server Error");
    }
}

export {
    login,
    register,
    getProfile,
    getReportOne,
    getReportAll,
    updateProfile,
    verifyPatient,
}