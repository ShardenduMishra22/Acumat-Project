  # **User Types**

1. **Patient (`/patient`)**
2. **Hospital (`/hospital`)**

---

## **Patient Routes (`/patient`)**

### **Authentication**

2. **POST** `/login` → Authenticate a patient.  
1. **POST** `/register` → Register a new patient.  

### **Report & History**

4. **GET** `/report/:id` → Retrieve a specific report.  
3. **GET** `/reports` → Retrieve all available reports.  
5. **GET** `/history` → Fetch the patient’s case history.  

### **Profile Management**

6. **GET** `/profile` → Get patient profile details.  
7. **PUT** `/profile` → Update patient profile details.  

### **Patient Data Model**

```json
{
  "role": "Patient",
  "gender": "string",
  "full_name": "string",
  "phone_number": "string",
  "patient_id": "Unique ID",
}
```

---

## **Hospital Routes (`/hospital`)**

### **Authentication**

1. **POST** `/register` → Register a new hospital.  
2. **POST** `/login` → Authenticate a hospital.  

### **Case Management**

3. **GET** `/cases` → Get all cases.  
4. **POST** `/cases` → Create a new case.  
5. **GET** `/cases/:id` → Retrieve a specific case.  
6. **PUT** `/cases/:id` → Update a specific case.  
7. **DELETE** `/cases/:id` → Remove a case.  
8. **PUT** `/cases/status/:id` → Update the status of a specific case (e.g., "In Progress", "Completed").  

### **Case Data Model**

```json
{
  "status": "string",
  "case_id": "Unique ID",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "patient_id": "Reference to patient",
  "hospital_id": "Reference to hospital",
}
```

---

### **Image Management**

9. **GET** `/cases/images/:id` → Get images related to a specific case.  
10. **POST** `/cases/images/:id` → Upload images (CT, MRI, etc.) for a case.  
11. **PUT** `/cases/images/:id` → Update images for a case (add annotations, replace, etc.).  
12. **DELETE** `/cases/images/:id` → Remove specific images.  

### **Image Data Model**

```json
{
  "image_url": "string",
  "image_id": "Unique ID",
  "uploaded_at": "timestamp",
  "case_id": "Reference to case",
  "annotations": ["array of annotation data"],
}
```

---

### **Lab & Vitals Management**

13. **POST** `/cases/:id/labs` → Submit lab results and vital signs (CBC, glucose, BP, HR, etc.).  
14. **GET** `/cases/:id/labs` → Retrieve lab and vital data for a case.  
15. **PUT** `/cases/:id/labs` → Update lab results if needed.  

### **Lab & Vitals Data Model**

```json
{
  "hr": "value",
  "bp": "value",
  "cbc": "value",
  "glucose": "value",
  "lab_id": "Unique ID",
  "o2_saturation": "value",
  "updated_at": "timestamp",
  "case_id": "Reference to case",
}
```

---

### **Report & Document Management**

16. **GET** `/cases/:id/reports` → Fetch generated reports.  
17. **POST** `/reports/send` → Send a report to a patient via email or hospital system.  
18. **POST** `/documents` → Upload additional PDFs or supporting documents.  
19. **GET** `/documents/:id` → Retrieve a specific document.  
20. **DELETE** `/documents/:id` → Remove an uploaded document.  

### **Report Data Model**

```json
{
  "report_url": "string",
  "report_id": "Unique ID",
  "created_at": "timestamp",
  "case_id": "Reference to case",
}
```

### **Document Data Model**

```json
{
  "document_url": "string",
  "document_id": "Unique ID",
  "uploaded_at": "timestamp",
  "case_id": "Reference to case",
}
```

---

### **Emergency & Quick Actions**

21. **POST** `/emergency/activate` → Activate emergency protocol (e.g., Code Stroke).  

---

### **Guidelines & Notifications**

22. **GET** `/guidelines` → Fetch clinical guidelines for reference.  
23. **GET** `/notifications` → Retrieve alerts and notifications.  


The report summary is specific to an individual case. Each case goes through data entry, image upload, and lab input, and then the system generates a summary of the key findings. This could include:

Diagnosis (e.g., "Large Vessel Occlusion Detected")
Treatment Recommendations (e.g., "Eligible for Thrombolysis")
Critical Values (highlighting abnormal lab results or vitals)