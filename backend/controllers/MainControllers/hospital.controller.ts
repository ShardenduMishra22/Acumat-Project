import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { apiResponse } from "../../util/apiReponse";
import { Document as Doc, Hospital, Report } from "../../model";

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !address) {
      return apiResponse(res, 400, "All fields are required");
    }

    if (password.length < 8) {
      return apiResponse(res, 400, "Password must be at least 8 characters long");
    }

    const hospitalExist = await Hospital.findOne({ email });
    if (hospitalExist) {
      return apiResponse(res, 400, "Hospital already exists");
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
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return apiResponse(res, 400, "All fields are required");
    }

    const hospitalExist = await Hospital.findOne({ email });
    if (!hospitalExist) {
      return apiResponse(res, 400, "Hospital does not exist");
    }

    const isMatch = await bcrypt.compare(password, hospitalExist.password);
    if (!isMatch) {
      return apiResponse(res, 400, "Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: hospitalExist._id,
        role: hospitalExist.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    hospitalExist.password = "Hidden for Security Reasons";
    return apiResponse(res, 200, "Hospital Logged In Successfully", [hospitalExist, token]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const verifyHospital = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const hospitalExist = await Hospital.findById(_id);

    if (!hospitalExist) {
      return apiResponse(res, 400, "Hospital does not exist");
    }

    hospitalExist.password = "Hidden for Security Reasons";
    return apiResponse(res, 200, "Hospital Verified Successfully", [hospitalExist]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const emergencyActivate = async (req: Request, res: Response) => {
  try {
    const {
      caseId,
      patientId,
      documentId = "N/A",
      timeOfLastNormal = Date.now(),
      symptoms = ["N/A"],
      BP = "N/A",
      HR = "N/A",
      O2_Saturation = "N/A",
    } = req.body;

    if (!caseId || !patientId) {
      return apiResponse(res, 400, "Case ID and Patient ID are required");
    }

    const reportExist = await Report.findOne({ caseId, patientId });
    if (reportExist) {
      return apiResponse(res, 400, "Report already exists");
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
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

export {
  login,
  register,
  verifyHospital,
  emergencyActivate,
};