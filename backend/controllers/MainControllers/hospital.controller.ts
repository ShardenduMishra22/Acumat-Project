import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Case, Document, Hospital, Patient, Report } from "../../model";
import { apiResponse } from "../../util/apiReponse";

const register = async (req: Request, res: Response) => {
    try{
        const { fullName, email, password, phoneNumber, address } = req.body;

        if(!fullName || !email || !password || !phoneNumber || !address){
            return apiResponse(res, 400, "All fields are required");
        }

        if(password.length < 8){
            return apiResponse(res, 400, "Password must be atleast 6 characters long");
        }


        const hospitalExist = await Hospital.findOne({email})
        if(hospitalExist){
            return apiResponse(res, 400, "Hospital already exist");
        }

        const genSalt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const newHospital = new Hospital({
            email,
            address,
            fullName,
            phoneNumber,
            password: hashedPassword,
        });

        await newHospital.save();
        return apiResponse(res, 200, "Hospital Registered Successfully");
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return apiResponse(res, 400, "All fields are required");
        }

        const hospitalExist = await Hospital.findOne({email});
        if(!hospitalExist){
            return apiResponse(res, 400, "Hospital does not exist");
        }

        const isMatch = await bcrypt.compare(password, hospitalExist.password);
        if(!isMatch){
            return apiResponse(res, 400, "Invalid Credentials");
        }

        const token = jwt.sign(
            {
                id: hospitalExist._id,
                role: hospitalExist.role
            }, 
            process.env.JWT_SECRET as string, 
            {expiresIn: "30d"}
        );

        hospitalExist.password = "Hidden for Security Reasons";
        return apiResponse(res, 200, "Patient Logged In Successfully", [hospitalExist,token]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const verifyHospital = async (req: Request, res: Response) => {
    try{
        const { _id } = req.body;
        const hospitalExist = await Hospital.findById({_id});

        if(!hospitalExist){
            return apiResponse(res, 400, "Hospital does not exist");
        }

        hospitalExist.password = "Hidden for Security Reasons";
        return apiResponse(res, 200, "Hospital Verified Successfully", [hospitalExist]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const postCase = async (req: Request, res: Response) => {
    try {
        const hospitalId = req.params.id;
        const { patientId } = req.body;

        if (!patientId || !hospitalId) {
            return apiResponse(res, 400, "All fields are required");
        }

        const hospitalExist = await Hospital.findById(hospitalId);
        if (!hospitalExist) {
            return apiResponse(res, 400, "Hospital does not exist");
        }

        const patientExist = await Patient.findById(patientId);
        if (!patientExist) {
            return apiResponse(res, 400, "Patient does not exist");
        }

        const newCase = await Case.create({
            patientId,
            hospitalId,
            status: "Pending",
        });

        hospitalExist.cases.push(newCase._id as mongoose.Types.ObjectId);
        await hospitalExist.save();

        return apiResponse(res, 200, "Case Created Successfully", [newCase]);
    } catch (err) {
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
};

const getAllCases = async (req: Request, res: Response) => {
    try{
        const hospitalId = req.params.id;
        const hospitalExist = await Hospital.findById(hospitalId).populate("cases");

        if(!hospitalExist){
            return apiResponse(res, 400, "Hospital does not exist");
        }

        return apiResponse(res, 200, "All Cases Retrieved Successfully", [hospitalExist.cases]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const getUniqueCase = async (req: Request, res: Response) => {
    try{
        const caseId = req.params.id;
        const caseExist = await Case.findById({caseId});
        if(!caseExist){
            return apiResponse(res, 400, "Case does not exist");
        }

        return apiResponse(res, 200, "Case Retrieved Successfully", [caseExist]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const deleteCase = async (req: Request, res: Response) => {
    try{
        const caseId = req.params.id;
        await Case.findByIdAndDelete({caseId});
        return apiResponse(res, 200, "Case Deleted Successfully");
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const updateCase = async (req: Request, res: Response) => {
    try{
        const caseId = req.params.id;
        const { status } = req.body;

        if(!status){
            return apiResponse(res, 400, "Status is required");
        }

        const caseExist = await Case.findById({caseId});
        if(!caseExist){
            return apiResponse(res, 400, "Case does not exist");
        }

        caseExist.status = status;
        await caseExist.save();

        return apiResponse(res, 200, "Case Updated Successfully", [caseExist]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const getDocumentOne = async (req: Request, res: Response) => {
    try{
        const { patientId, caseId } = req.body;

        const document = await Document.findById({caseId,patientId}).select("documents");
        if(!document){
            return apiResponse(res, 400, "Document does not exist");
        }

        return apiResponse(res, 200, "Document Retrieved Successfully", [document]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const postDocument = async (req: Request, res: Response) => {
    try{
        const { patientId, caseId, documentName, documentType, documentUrl } = req.body;

        if(!patientId || !caseId || !documentName || !documentType || !documentUrl){
            return apiResponse(res, 400, "All fields are required");
        }

        const documentExist = await Document.findOne({caseId,patientId});
        if(documentExist){
            return apiResponse(res, 400, "Document already exist");
        }

        const newDocument = await Document.create({
            caseId,
            patientId,
            documentName,
            documentType,
            documentUrl,
        });
        await newDocument.save();

        return apiResponse(res, 200, "Document Created Successfully", [newDocument]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const updateDocument = async (req: Request, res: Response) => {
    try{
        const { patientId, caseId, documentName, documentType, documentUrl } = req.body;

        if(!patientId || !caseId || !documentName || !documentType || !documentUrl){
            return apiResponse(res, 400, "All fields are required");
        }

        const documentExist = await Document.findOne({caseId,patientId});
        if(!documentExist){
            return apiResponse(res, 400, "Document does not exist");
        }

        documentExist.documentName = documentName;
        documentExist.documentType = documentType;
        documentExist.documentUrl = documentUrl;
        await documentExist.save();

        return apiResponse(res, 200, "Document Updated Successfully", [documentExist]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const deleteDocument = async (req: Request, res: Response) => {
    try{
        const { patientId, caseId } = req.body;
        await Document.findOneAndDelete({caseId,patientId});
        return apiResponse(res, 200, "Document Deleted Successfully");
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const postReport = async (req: Request, res: Response) => {
    try{
        const { caseId, patientId, documentId, timeOfLastNormal, symptoms, BP, HR, O2_Saturation } = req.body;

        if(!caseId || !patientId || ! documentId || !timeOfLastNormal || !symptoms || !BP || !HR || !O2_Saturation){
            return apiResponse(res, 400, "All fields are required");
        }

        const reportExist = await Report.findOne({caseId,patientId});
        if(reportExist){
            return apiResponse(res, 400, "Report already exist");
        }

        const newReport = await Report.create({
            BP,
            HR,
            caseId,
            symptoms,
            patientId,
            documentId,
            O2_Saturation,
            timeOfLastNormal,
        });
        await newReport.save();

        return apiResponse(res, 200, "Report Created Successfully", [newReport]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const getReportsOne = async (req: Request, res: Response) => {
    try{
        const { caseId, patientId } = req.body;
        const report = await Report.findOne({caseId,patientId}).select("reports");
        if(!report){
            return apiResponse(res, 400, "Report does not exist");
        }

        return apiResponse(res, 200, "Report Retrieved Successfully", [report]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const updateReport = async (req: Request, res: Response) => {
    try{
        const { caseId, patientId, documentId, timeOfLastNormal, symptoms, BP, HR, O2_Saturation } = req.body;

        if(!caseId || !patientId || ! documentId || !timeOfLastNormal || !symptoms || !BP || !HR || !O2_Saturation){
            return apiResponse(res, 400, "All fields are required");
        }

        const reportExist = await Report.findOne({caseId,patientId});
        if(!reportExist){
            return apiResponse(res, 400, "Report does not exist");
        }

        reportExist.BP = BP;
        reportExist.HR = HR;
        reportExist.symptoms = symptoms;
        reportExist.timeOfLastNormal = timeOfLastNormal;
        reportExist.O2_Saturation = O2_Saturation;
        await reportExist.save();

        return apiResponse(res, 200, "Report Updated Successfully", [reportExist]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const deleteReport = async (req: Request, res: Response) => {
    try{
        const { caseId, patientId } = req.body;
        await Report.findOneAndDelete({caseId,patientId});
        return apiResponse(res, 200, "Report Deleted Successfully");
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}


const emergencyActivate = async (req: Request, res: Response) => {
    try{
        const { caseId, patientId, documentId = "N/A", timeOfLastNormal = Date.now(), symptoms= ["N/A"], BP = "N/A", HR= "N/A", O2_Saturation= "N/A" } = req.body;

        if(!caseId || !patientId || ! documentId || !timeOfLastNormal || !symptoms || !BP || !HR || !O2_Saturation){
            return apiResponse(res, 400, "All fields are required");
        }

        const reportExist = await Report.findOne({caseId,patientId});
        if(reportExist){
            return apiResponse(res, 400, "Report already exist");
        }

        const newReport = await Report.create({
            BP,
            HR,
            caseId,
            symptoms,
            patientId,
            documentId,
            O2_Saturation,
            timeOfLastNormal,
        });
        await newReport.save();

        return apiResponse(res, 200, "Report Created Successfully", [newReport]);
    }catch(err){
        console.log("There was an Error", err);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

export{
    login,
    register,
    postCase,
    deleteCase,
    updateCase,
    postReport,
    getAllCases,
    updateReport,
    deleteReport,
    postDocument,
    getUniqueCase,
    getReportsOne,
    verifyHospital,
    getDocumentOne,
    updateDocument,
    deleteDocument,
    emergencyActivate,
}