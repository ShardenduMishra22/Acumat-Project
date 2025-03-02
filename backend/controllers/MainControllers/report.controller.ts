import { Report } from '../../model';
import { Request, Response } from 'express';
import { apiResponse } from "../../util/apiReponse";

const postReport = async (req: Request, res: Response) => {
  try {
    const { caseId, patientId, documentId, timeOfLastNormal, symptoms, BP, HR, O2_Saturation } = req.body;

    if (!caseId || !patientId || !documentId || !timeOfLastNormal || !symptoms || !BP || !HR || !O2_Saturation) {
      return apiResponse(res, 400, "All fields are required");
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

const getReportsOne = async (req: Request, res: Response) => {
  try {
    const { caseId, patientId } = req.body;
    const report = await Report.findOne({ caseId, patientId });
    if (!report) {
      return apiResponse(res, 400, "Report does not exist");
    }

    return apiResponse(res, 200, "Report Retrieved Successfully", [report]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const updateReport = async (req: Request, res: Response) => {
  try {
    const { caseId, patientId, documentId, timeOfLastNormal, symptoms, BP, HR, O2_Saturation } = req.body;

    if (!caseId || !patientId || !documentId || !timeOfLastNormal || !symptoms || !BP || !HR || !O2_Saturation) {
      return apiResponse(res, 400, "All fields are required");
    }

    const reportExist = await Report.findOne({ caseId, patientId });
    if (!reportExist) {
      return apiResponse(res, 400, "Report does not exist");
    }

    reportExist.BP = BP;
    reportExist.HR = HR;
    reportExist.symptoms = symptoms;
    reportExist.timeOfLastNormal = timeOfLastNormal;
    reportExist.O2_Saturation = O2_Saturation;
    await reportExist.save();

    return apiResponse(res, 200, "Report Updated Successfully", [reportExist]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const deleteReport = async (req: Request, res: Response) => {
  try {
    const { caseId, patientId } = req.body;
    await Report.findOneAndDelete({ caseId, patientId });
    return apiResponse(res, 200, "Report Deleted Successfully");
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

export{
  postReport,
  updateReport,
  deleteReport,
  getReportsOne,
}