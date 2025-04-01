"use client";

import { useEffect, useState } from "react";
import { Search, PanelLeft, Plus, FileText, File, FileSpreadsheet, FileImage, FileArchive, FileCode, FileAudio, FileVideo } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import useStore from "@/store/useStore";
import { mockData } from "@/lib/constants";

import UploadDocument from "../uploadDocuments/upload-document";
import AddSource from "../addSource/add-source";
import { Checkbox } from "../ui/checkbox";

// File icon mapping
const getFileIcon = (extension, fileName) => {
  switch (extension.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="w-5 h-5 text-purple-500" />;
    case 'zip':
    case 'rar':
      return <FileArchive className="w-5 h-5 text-yellow-500" />;
    case 'txt':
      return <FileCode className="w-5 h-5 text-gray-500" />;
    case 'mp3':
    case 'wav':
      return <FileAudio className="w-5 h-5 text-pink-500" />;
    case 'mp4':
    case 'mov':
      return <FileVideo className="w-5 h-5 text-indigo-500" />;
    default:
      return <File className="w-5 h-5 text-gray-400" />;
  }
};

const DocumentSearchTab = ({ title, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [documents, setDocuments] = useState([]);
  const { selectedDocumentId, setSelectedDocumentId, toggleItem, documentsList } = useStore();
  

  useEffect(() => {
    if (documentsList?.Documents) {
      const mappedDocuments = documentsList.Documents.map((doc) => ({
        id: doc.ID,
        name: doc.FileName,
        createdBy: doc.CreatedBy,
        createdAt: doc.CreationDateTime,
        downloadUrl: doc.URL,
        extension: doc.Extension,
      }));
      setDocuments(mappedDocuments);
    }
  }, [documentsList]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSelectDocument = (item) => {
    if (selectedDocumentId === item.id) {
      setSelectedDocumentId(null);
      return;
    }
    console.log(item);
    setSelectedDocumentId(item.id);
  };

  // Get selected document name for collapsed view
  const selectedDoc = documents.find(doc => doc.id === selectedDocumentId);

  return (
    <Card
      className={`text-slate-800 w-full flex flex-col gap-4 rounded-2xl shadow-lg transition-all ease-in-out duration-300 ${
        isCollapsed
          ? "h-[50px] md:h-full w-full md:w-[60px]"
          : "min-w-[280px] md:min-w-fit md:w-[30%] h-full"
      }`}
    >
      <CardHeader>
        <CardTitle className="border-b border-slate-300 p-1">
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <p className="text-muted-foreground text-sm font-medium pl-2 md:pl-4">
                Source
              </p>
            )}
            <div
              className={`text-muted-foreground cursor-pointer hover:bg-gray-200 ${
                isCollapsed
                  ? "rounded-t-2xl h-8"
                  : "w-8 h-8 flex items-center justify-center rounded-full"
              }`}
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip asChild>
                    <TooltipTrigger>
                      <Search
                        size={18}
                        className="cursor-pointer w-13 md:h-8 h-9 p-1 flex items-center justify-center rounded-t-2xl"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">Add Source</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <PanelLeft size={18} />
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {isCollapsed ? (
        <CardContent className="md:flex flex-col justify-center items-center gap-3">
            <Tooltip >
              <TooltipTrigger asChild>
                <Button variant="icon" className="hover:bg-gray-200/70 bg-gray-100"  >
                  <Plus size={18} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' >
                Add Source
              </TooltipContent>
            </Tooltip>
          {selectedDocumentId && selectedDoc && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="cursor-pointer flex flex-col p-2 items-center justify-center text-sm text-slate-100 rounded-md hover:bg-gray-100">
                    {getFileIcon(selectedDoc.extension, selectedDoc.name)}
                    {/* <p className="text-xs mt-1 text-slate-900 truncate w-full text-center">
                      {selectedDoc.name.length > 8 
                        ? `${selectedDoc.name.substring(0, 6)}...` 
                        : selectedDoc.name}
                    </p> */}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {selectedDoc.name} (ID: {selectedDocumentId})
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardContent>
      ) : (
        <CardContent className="flex flex-col h-full justify-around p-2 md:p-4 items-center gap-3 md:gap-5">
          <div className="w-full flex gap-2 md:gap-3 px-2 md:px-4">
            <AddSource />
            <UploadDocument />
          </div>
          <div className="w-full flex flex-col rounded-2xl px-2 md:px-4">
            <div className="flex justify-between items-center px-4 md:px-6 py-2 bg-indigo-900/80 rounded-t-2xl shadow-sm">
              <p className="text-white text-sm md:text-md px-2 md:px-4 py-2 font-medium tracking-wide">
                📄 Document List
              </p>
            </div>
            <div className="flex flex-col h-[300px] md:h-[400px] overflow-y-auto rounded-2xl rounded-t-none p-4 space-y-1 bg-white ">
              {documents && documents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectDocument(item)}
                  className={`flex items-center justify-between gap-3 p-4 rounded-xl cursor-pointer ${
                    selectedDocumentId === item.id
                      ? "bg-indigo-50 hover:border-indigo-400 text-indigo-800/70"
                      : "bg-white border-gray-100 hover:shadow-sm hover:border-indigo-400]"
                  }`}
                >
                  <div className="flex gap-4 justify-start items-center">
                    <div className="flex items-center gap-3">
                      {getFileIcon(item.extension, item.name)}
                      <div>
                        <p className="text-sm font-medium">{item.id}</p>
                        <p className="text-sm text-gray-600">{item.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DocumentSearchTab;