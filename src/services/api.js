// lib/api.js
import axios from "axios";

// Base config
const BASE_URL = process.env.DFX_PUBLIC_API_URL || "http://localhost/DFXDMSLite/dfxapi_demo";
const BASE_URL_2 = process.env.DFX_NEXT_PUBLIC_API_URL ||  "http://localhost/DFX_NEXT_API/api"

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const api2 = axios.create({
  baseURL: BASE_URL_2,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints

export const fetchUser = () => api.get("/App/User");

export const fetchDocumentData = (documentId) =>
  api.post(`/DMS/Document/DataVersion/LFRepo/${documentId}`);

export const fetchDocumentsList = (ids = [],ColumnDetailMasterID ) => {
  const payload = {
    Repository: process.env.REPOSITORY_NAME || "LFRepo",
    Columns: [
      [
        {
          SearchFieldType: 0,
          BaseField: "ID",
          Value: ids.join(","),
          Condition: 0,
        },
      ],
    ],
    Page: 1,
    No: 25,
    ColumnSortType: 1,
    ColumnName: "CreationDateTime",
    ColumnSortOrder: 0,
    AllData: false,
    CacheId: "50TVwyv3ef",
    DeletedFiles: false,
  };

  return api.post(`/DMS/Documents/Query/${ColumnDetailMasterID}`, payload);
};

export const fetchTabsList = (id) => {
  return api2.get(`/DashboardPage/GetDashboardPageByID?DashboarId=${id}`)
}

export default api;
