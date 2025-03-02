import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { apiResponse } from "../../util/apiReponse";
import { Case, Hospital, Patient } from "../../model";

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
  try {
    const hospitalId = req.params.id;
    const hospitalExist = await Hospital.findById(hospitalId).populate("cases");

    if (!hospitalExist) {
      return apiResponse(res, 400, "Hospital does not exist");
    }

    return apiResponse(res, 200, "All Cases Retrieved Successfully", [hospitalExist.cases]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const getUniqueCase = async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id;
    const caseExist = await Case.findById(caseId);
    if (!caseExist) {
      return apiResponse(res, 400, "Case does not exist");
    }

    return apiResponse(res, 200, "Case Retrieved Successfully", [caseExist]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const deleteCase = async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id;
    await Case.findByIdAndDelete(caseId);
    return apiResponse(res, 200, "Case Deleted Successfully");
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

const updateCase = async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return apiResponse(res, 400, "Status is required");
    }

    const caseExist = await Case.findById(caseId);
    if (!caseExist) {
      return apiResponse(res, 400, "Case does not exist");
    }

    caseExist.status = status;
    await caseExist.save();

    return apiResponse(res, 200, "Case Updated Successfully", [caseExist]);
  } catch (err) {
    console.log("There was an Error", err);
    return apiResponse(res, 500, "Internal Server Error");
  }
};

export{
  postCase,
  deleteCase,
  updateCase,
  getAllCases,
  getUniqueCase,
}