// lib/api.js
import axios from "axios";
import useStore from "@/store/useStore";

// Helper to create axios instance with dynamic config
const getApiInstance = () => {
  const { configs } = useStore.getState();

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

  return axios.create({
    baseURL: configs?.NEXT_PUBLIC_DFX_API_URL_2 || "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getApi3Instance = () => {
  const { configs } = useStore.getState();

  return axios.create({
    baseURL: configs?.NEXT_PUBLIC_DFX_API_URL_3 || "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getRepoName = () => {
  const { configs } = useStore.getState();
  return configs?.NEXT_PUBLIC_REPOSITORY_NAME || "";
};

// API functions

export const fetchUser = () => {
  const api = getApiInstance();

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

export const uploadFiles = async (files) => {
  const api = getApiInstance();
  const REPO_NAME = getRepoName();

  const filePromises = files.map((file) => fileToBase64(file));

  try {
    const base64Files = await Promise.all(filePromises);

    // Dynamically create the payload for all files
    const fileData = base64Files.map((base64Data, index) => ({
      File: files[index].name,
      LocalFile: "",
      Filename: "",
      SecCode: "",
      Data: base64Data,
      VolumeID: -1,
      IsNew: false,
    }));

    const payload = {
      Repository: REPO_NAME,
      Files: fileData,
    };

    const response = await api.post(`/DMS/UploadFromDnDFile`, payload);
    console.log(response, "this is in API");
    return response;
  } catch (error) {
    const err = new Error(error.message || "Something went wrong");
    err.status = error.status || 500;
    return err;
  }
};

export const fetchWorkspaceCollections = () => {
  const api = getApi3Instance();

  return api.get("/Workspace/GetWorkspace");
};

export const saveWorkSpaceCollection = async (payload) => {
  const api = getApi3Instance();

  try {
    const res = await api.post("/Workspace/Save", payload);
    console.log(res, "workspace save method res");
    return res;
  } catch (error) {
    const err = new Error(error.message || "something went wrong");
    err.status = err.status || 500;
    return err;
  }
};
