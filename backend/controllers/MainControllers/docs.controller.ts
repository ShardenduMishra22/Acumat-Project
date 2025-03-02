import { Request, Response } from 'express';
import { Document as Doc } from '../../model';
import { apiResponse } from '../../util/apiReponse';

const getDocumentOne = async (req: Request, res: Response) => {
  try {
    const { patientId, caseId } = req.body;
    const document = await Doc.findOne({ caseId, patientId });
    if (!document) {
      return apiResponse(res, 400, 'Document does not exist');
    }

    return apiResponse(res, 200, 'Document Retrieved Successfully', [document]);
  } catch (err) {
    console.log('There was an Error', err);
    return apiResponse(res, 500, 'Internal Server Error');
  }
};

const postDocument = async (req: Request, res: Response) => {
  try {
    const { patientId, caseId, documentName, documentType, documentUrl } = req.body;

    if (!patientId || !caseId || !documentName || !documentType || !documentUrl) {
      return apiResponse(res, 400, 'All fields are required');
    }

    const documentExist = await Doc.findOne({ caseId, patientId });
    if (documentExist) {
      return apiResponse(res, 400, 'Document already exists');
    }

    const newDocument = await Doc.create({
      caseId,
      patientId,
      documentName,
      documentType,
      documentUrl,
    });
    await newDocument.save();

    return apiResponse(res, 200, 'Document Created Successfully', [newDocument]);
  } catch (err) {
    console.log('There was an Error', err);
    return apiResponse(res, 500, 'Internal Server Error');
  }
};

const updateDocument = async (req: Request, res: Response) => {
  try {
    const { patientId, caseId, documentName, documentType, documentUrl } = req.body;

    if (!patientId || !caseId || !documentName || !documentType || !documentUrl) {
      return apiResponse(res, 400, 'All fields are required');
    }

    const documentExist = await Doc.findOne({ caseId, patientId });
    if (!documentExist) {
      return apiResponse(res, 400, 'Document does not exist');
    }

    documentExist.documentName = documentName;
    documentExist.documentType = documentType;
    documentExist.documentUrl = documentUrl;
    await documentExist.save();

    return apiResponse(res, 200, 'Document Updated Successfully', [documentExist]);
  } catch (err) {
    console.log('There was an Error', err);
    return apiResponse(res, 500, 'Internal Server Error');
  }
};

const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { patientId, caseId } = req.body;
    await Doc.findOneAndDelete({ caseId, patientId });
    return apiResponse(res, 200, 'Document Deleted Successfully');
  } catch (err) {
    console.log('There was an Error', err);
    return apiResponse(res, 500, 'Internal Server Error');
  }
};

export { postDocument, getDocumentOne, updateDocument, deleteDocument };
