// lib/api.js
import axios from "axios";
import useStore from "@/store/useStore";

// Helper to create axios instance with dynamic config
const getApiInstance = () => {
  const { configs } = useStore.getState();

  console.log(configs, 'api instance 1')
  
  return axios.create({
    baseURL: configs?.NEXT_PUBLIC_DFX_API_URL || "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getApi2Instance = () => {
  const { configs } = useStore.getState();
  
  console.log(configs?.NEXT_PUBLIC_DFX_API_URL_2)
  return axios.create({
    baseURL: configs?.NEXT_PUBLIC_DFX_API_URL_2 || "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getRepoName = () => {
  const { configs } = useStore.getState();
  console.log( configs?.NEXT_PUBLIC_REPOSITORY_NAME)
  return configs?.NEXT_PUBLIC_REPOSITORY_NAME || "";
};

// API functions

export const fetchUser = () => {
  const api = getApiInstance();
  console.log('this is get user from api instance', api)
  return api.get("App/User");
};

export const fetchDocumentData = (documentId) => {
  const api = getApiInstance();
  const REPO_NAME = getRepoName();
  return api.post(`/DMS/Document/DataVersion/${REPO_NAME}/${documentId}`);
};

export const fetchDocumentsList = (ids = [], ColumnDetailMasterID) => {
  const api = getApiInstance();
  const REPO_NAME = getRepoName();

  const payload = {
    Repository: REPO_NAME,
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
  const api2 = getApi2Instance();
  return api2.get(`/DashboardPage/GetDashboardPageByID?DashboarId=${id}`);
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

export const uploadFile = async (file) => {
  const api = getApiInstance();
  const REPO_NAME = getRepoName();
  const base64Data = await fileToBase64(file);

  const payload = {
    Repository: REPO_NAME,
    Files: [
      {
        File: file.name,
        LocalFile: "",
        Filename: "",
        SecCode: "",
        Data: base64Data,
      },
    ],
  };

  return api.post(`/DMS/UploadFromDnDFile`, payload);
};
