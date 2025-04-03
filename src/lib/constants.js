import Image from "next/image";

export const getFileIcon = (extension, fileName) => {
  const iconProps = { width: 24, height: 30, alt: fileName };

  switch (extension.toLowerCase()) {
    // Documents (Separated)
    case "pdf":
      return <Image src="/pdf.png" {...iconProps} />;
    case "docx":
      return <Image src="/docx-file.png" {...iconProps} />;
    case "doc":
      return <Image src="/doc-file.png" {...iconProps} />;
    case "docm":
      return <Image src="/docm-file.png" {...iconProps} />;
    case "rtf":
      return <Image src="/rtf.png" {...iconProps} />;

    // Spreadsheets (Separated)
    case "xlsx":
      return <Image src="/xlsx-file.png" {...iconProps} />;
    case "xls":
      return <Image src="/csv-file.png" {...iconProps} />;
    case "xlsm":
      return <Image src="/csv-file.png" {...iconProps} />;
    case "csv":
      return <Image src="/csv-file.png" {...iconProps} />;

    // Presentations (Separated)
    case "pptx":
      return <Image src="/pptx-file.png" {...iconProps} />;
    case "ppt":
      return <Image src="/ppt-file.png" {...iconProps} />;
    case "pptm":
      return <Image src="/pptx-file.png" {...iconProps} />;

    // Images (Grouped)
    case "jpg":
    case "jpeg":
      return <Image src="/jpg.png" {...iconProps} />;
    case "png":
      return <Image src="/png.png" {...iconProps} />;
    case "gif":
      return <Image src="/gif.png" {...iconProps} />;
    case "svg":
    case "bmp":
    case "webp":
    case "tiff":
    case "tif":
      return <Image src="/jpg.png" {...iconProps} />;

    // Archives (Grouped)
    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return <Image src="/zip.png" {...iconProps} />;

    // Code/Data (Grouped)
    case "txt":
      return <Image src="/txt.png" {...iconProps} />;
    case "json":
    case "xml":
    case "html":
    case "htm":
    case "css":
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "py":
    case "java":
      return <Image src="/coding.png" {...iconProps} />;

    // Default fallback icon
    default:
      return <Image src="/file.png" {...iconProps} />;
  }
};


export const mockData = {
  Root: null,
  Documents: [
    {
      ID: "1001",
      FileName: "report_sales_specifications_1.pptm",
      Name: "Report_1.pptm",
      MIME: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
      Extension: "pptm",
      CreationDateTime: "2025-01-18T13:55:12",
      LastModifiedDateTime: "2025-02-17T13:55:12",
      CreatedBy: "User3",
      LastModifiedBy: "User8",
      DownloadFilePath: "\\\\Server\\Files\\Report_Sales_Specifications_1.pptm",
      PageCount: 0,
      Size: 220887,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1001",
      Tags: [],
      IsLocked: true,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1002",
      FileName: "project_scientific_findings_2.docx",
      Name: "Project_2.docx",
      MIME: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      Extension: "docx",
      CreationDateTime: "2024-05-04T13:55:12",
      LastModifiedDateTime: "2024-05-12T13:55:12",
      CreatedBy: "User6",
      LastModifiedBy: "User6",
      DownloadFilePath: "\\\\Server\\Files\\Project_Scientific_Findings_2.docx",
      PageCount: 19,
      Size: 3842827,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1002",
      Tags: [],
      IsLocked: false,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1003",
      FileName: "research_sales_results_3.png",
      Name: "Research_3.png",
      MIME: "image/png",
      Extension: "png",
      CreationDateTime: "2024-08-07T13:55:12",
      LastModifiedDateTime: "2024-08-10T13:55:12",
      CreatedBy: "User7",
      LastModifiedBy: "User10",
      DownloadFilePath: "\\\\Server\\Files\\Research_Sales_Results_3.png",
      PageCount: 0,
      Size: 9732674,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1003",
      Tags: [],
      IsLocked: false,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1004",
      FileName: "analysis_marketing_specifications_4.csv",
      Name: "Analysis_4.csv",
      MIME: "text/csv",
      Extension: "csv",
      CreationDateTime: "2024-10-28T13:55:12",
      LastModifiedDateTime: "2024-11-09T13:55:12",
      CreatedBy: "User9",
      LastModifiedBy: "User6",
      DownloadFilePath:
        "\\\\Server\\Files\\Analysis_Marketing_Specifications_4.csv",
      PageCount: 0,
      Size: 8943242,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1004",
      Tags: [],
      IsLocked: false,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1005",
      FileName: "data_sales_specifications_5.jpg",
      Name: "Data_5.jpg",
      MIME: "image/jpeg",
      Extension: "jpg",
      CreationDateTime: "2024-10-19T13:55:12",
      LastModifiedDateTime: "2024-11-18T13:55:12",
      CreatedBy: "User2",
      LastModifiedBy: "User6",
      DownloadFilePath: "\\\\Server\\Files\\Data_Sales_Specifications_5.jpg",
      PageCount: 0,
      Size: 2620014,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1005",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1006",
      FileName: "data_technical_findings_6.py",
      Name: "Data_6.py",
      MIME: "text/x-python",
      Extension: "py",
      CreationDateTime: "2024-11-20T13:55:12",
      LastModifiedDateTime: "2024-12-03T13:55:12",
      CreatedBy: "User3",
      LastModifiedBy: "User9",
      DownloadFilePath: "\\\\Server\\Files\\Data_Technical_Findings_6.py",
      PageCount: 0,
      Size: 9903587,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1006",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1007",
      FileName: "project_scientific_results_7.css",
      Name: "Project_7.css",
      MIME: "text/css",
      Extension: "css",
      CreationDateTime: "2024-11-23T13:55:12",
      LastModifiedDateTime: "2024-11-29T13:55:12",
      CreatedBy: "User3",
      LastModifiedBy: "User6",
      DownloadFilePath: "\\\\Server\\Files\\Project_Scientific_Results_7.css",
      PageCount: 0,
      Size: 1692437,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1007",
      Tags: [],
      IsLocked: true,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1008",
      FileName: "research_marketing_proposal_8.py",
      Name: "Research_8.py",
      MIME: "text/x-python",
      Extension: "py",
      CreationDateTime: "2024-10-16T13:55:12",
      LastModifiedDateTime: "2024-11-12T13:55:12",
      CreatedBy: "User1",
      LastModifiedBy: "User8",
      DownloadFilePath: "\\\\Server\\Files\\Research_Marketing_Proposal_8.py",
      PageCount: 0,
      Size: 3190058,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1008",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1009",
      FileName: "study_sales_results_9.css",
      Name: "Study_9.css",
      MIME: "text/css",
      Extension: "css",
      CreationDateTime: "2024-12-24T13:55:12",
      LastModifiedDateTime: "2025-01-11T13:55:12",
      CreatedBy: "User6",
      LastModifiedBy: "User7",
      DownloadFilePath: "\\\\Server\\Files\\Study_Sales_Results_9.css",
      PageCount: 0,
      Size: 2766769,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1009",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1010",
      FileName: "study_technical_requirements_10.rar",
      Name: "Study_10.rar",
      MIME: "application/x-rar-compressed",
      Extension: "rar",
      CreationDateTime: "2025-01-10T13:55:12",
      LastModifiedDateTime: "2025-02-05T13:55:12",
      CreatedBy: "User9",
      LastModifiedBy: "User8",
      DownloadFilePath:
        "\\\\Server\\Files\\Study_Technical_Requirements_10.rar",
      PageCount: 0,
      Size: 9358008,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1010",
      Tags: [],
      IsLocked: false,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1011",
      FileName: "project_marketing_requirements_11.rtf",
      Name: "Project_11.rtf",
      MIME: "application/rtf",
      Extension: "rtf",
      CreationDateTime: "2025-04-01T13:55:12",
      LastModifiedDateTime: "2025-04-06T13:55:12",
      CreatedBy: "User8",
      LastModifiedBy: "User3",
      DownloadFilePath:
        "\\\\Server\\Files\\Project_Marketing_Requirements_11.rtf",
      PageCount: 0,
      Size: 8462633,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1011",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1012",
      FileName: "analysis_marketing_requirements_12.pptx",
      Name: "Analysis_12.pptx",
      MIME: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      Extension: "pptx",
      CreationDateTime: "2025-03-28T13:55:12",
      LastModifiedDateTime: "2025-04-01T13:55:12",
      CreatedBy: "User1",
      LastModifiedBy: "User1",
      DownloadFilePath:
        "\\\\Server\\Files\\Analysis_Marketing_Requirements_12.pptx",
      PageCount: 46,
      Size: 6049173,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1012",
      Tags: [],
      IsLocked: false,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1013",
      FileName: "report_technical_specifications_13.pptm",
      Name: "Report_13.pptm",
      MIME: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
      Extension: "pptm",
      CreationDateTime: "2025-01-12T13:55:12",
      LastModifiedDateTime: "2025-02-03T13:55:12",
      CreatedBy: "User5",
      LastModifiedBy: "User8",
      DownloadFilePath:
        "\\\\Server\\Files\\Report_Technical_Specifications_13.pptm",
      PageCount: 0,
      Size: 7857361,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1013",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1014",
      FileName: "data_marketing_results_14.jpg",
      Name: "Data_14.jpg",
      MIME: "image/jpeg",
      Extension: "jpg",
      CreationDateTime: "2024-07-11T13:55:12",
      LastModifiedDateTime: "2024-07-24T13:55:12",
      CreatedBy: "User4",
      LastModifiedBy: "User9",
      DownloadFilePath: "\\\\Server\\Files\\Data_Marketing_Results_14.jpg",
      PageCount: 0,
      Size: 8620825,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1014",
      Tags: [],
      IsLocked: false,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1015",
      FileName: "project_marketing_requirements_15.xls",
      Name: "Project_15.xls",
      MIME: "application/vnd.ms-excel",
      Extension: "xls",
      CreationDateTime: "2024-09-29T13:55:12",
      LastModifiedDateTime: "2024-10-06T13:55:12",
      CreatedBy: "User5",
      LastModifiedBy: "User5",
      DownloadFilePath:
        "\\\\Server\\Files\\Project_Marketing_Requirements_15.xls",
      PageCount: 0,
      Size: 1487281,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1015",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1016",
      FileName: "analysis_sales_results_16.bmp",
      Name: "Analysis_16.bmp",
      MIME: "image/bmp",
      Extension: "bmp",
      CreationDateTime: "2024-05-07T13:55:12",
      LastModifiedDateTime: "2024-05-19T13:55:12",
      CreatedBy: "User3",
      LastModifiedBy: "User7",
      DownloadFilePath: "\\\\Server\\Files\\Analysis_Sales_Results_16.bmp",
      PageCount: 0,
      Size: 9988528,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1016",
      Tags: [],
      IsLocked: true,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1017",
      FileName: "study_technical_specifications_17.bmp",
      Name: "Study_17.bmp",
      MIME: "image/bmp",
      Extension: "bmp",
      CreationDateTime: "2024-05-13T13:55:12",
      LastModifiedDateTime: "2024-05-14T13:55:12",
      CreatedBy: "User5",
      LastModifiedBy: "User3",
      DownloadFilePath:
        "\\\\Server\\Files\\Study_Technical_Specifications_17.bmp",
      PageCount: 0,
      Size: 3654564,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1017",
      Tags: [],
      IsLocked: true,
      IsStarred: false,
      HasDetail: false,
    },
    {
      ID: "1018",
      FileName: "analysis_marketing_specifications_18.json",
      Name: "Analysis_18.json",
      MIME: "application/json",
      Extension: "json",
      CreationDateTime: "2025-03-18T13:55:12",
      LastModifiedDateTime: "2025-03-31T13:55:12",
      CreatedBy: "User1",
      LastModifiedBy: "User6",
      DownloadFilePath:
        "\\\\Server\\Files\\Analysis_Marketing_Specifications_18.json",
      PageCount: 0,
      Size: 8516576,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1018",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1019",
      FileName: "project_sales_findings_19.xlsm",
      Name: "Project_19.xlsm",
      MIME: "application/vnd.ms-excel.sheet.macroEnabled.12",
      Extension: "xlsm",
      CreationDateTime: "2025-01-08T13:55:12",
      LastModifiedDateTime: "2025-02-04T13:55:12",
      CreatedBy: "User7",
      LastModifiedBy: "User4",
      DownloadFilePath: "\\\\Server\\Files\\Project_Sales_Findings_19.xlsm",
      PageCount: 0,
      Size: 1266903,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1019",
      Tags: [],
      IsLocked: true,
      IsStarred: true,
      HasDetail: false,
    },
    {
      ID: "1020",
      FileName: "analysis_financial_requirements_20.bmp",
      Name: "Analysis_20.bmp",
      MIME: "image/bmp",
      Extension: "bmp",
      CreationDateTime: "2024-07-12T13:55:12",
      LastModifiedDateTime: "2024-07-17T13:55:12",
      CreatedBy: "User8",
      LastModifiedBy: "User10",
      DownloadFilePath:
        "\\\\Server\\Files\\Analysis_Financial_Requirements_20.bmp",
      PageCount: 0,
      Size: 5827047,
      RepoName: "MainRepository",
      CheckedOutBy: null,
      URL: "https://demo.example.com/doc/1020",
      Tags: [],
      IsLocked: false,
      IsStarred: true,
      HasDetail: false,
    },
  ],
  DeletedDocuments: [],
  MaxCount: 3,
  GroupData: null,
  QueryString: "((({LF:ID=60} | {LF:ID=62} | {LF:ID=68})))",
  Repository: null,
  AllData: null,
  User: null,
  Status: "Success",
  ErrorMessage: null,
  DataID: 0,
  ResultID: [],
  DataPath: null,
  Data: null,
  DataCount: 0,
  Name: null,
};

export const TabsData = [
  { id: 1, label: "Metadata" },
  { id: 2, label: "Preview" },
  { id: 3, label: "Chat" },
];

export const successToastObj = {
  style: {
    backgroundColor: '#daf1db',
    // border: "0.5px solid #7ece82",
    color: '#7ece82',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '320px'
  },
  iconTheme: {
    primary: '#7ece82',
    secondary: '#f8f9fa',
  }
}
