"use client";

import { useEffect, useState } from "react";
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
import { getFileIcon, mockData, successToastObj } from "@/lib/constants";

import UploadDocument from "../uploadDocuments/upload-document";
import AddSource from "../addSource/add-source";
import { Checkbox } from "../ui/checkbox";
import { EllipsisVertical, PanelLeft, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

const DocumentSearchTab = ({ title, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [documents, setDocuments] = useState([]);
  const {
    selectedDocumentId,
    setSelectedDocumentId,
    toggleItem,
    documentsList,
  } = useStore();

  useEffect(() => {
    if (mockData?.Documents) {
      const mappedDocuments = mockData.Documents.map((doc) => ({
        id: doc.ID,
        name: doc.FileName,
        createdBy: doc.CreatedBy,
        createdAt: doc.CreationDateTime,
        downloadUrl: doc.URL,
        extension: doc.Extension,
      }));
      setDocuments(mappedDocuments);
    }
  }, [mockData]);

  const handleCopyName = (name) => {
    navigator.clipboard.writeText(name);
    toast.success("copied to clipboard !", successToastObj)
  };

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
  const selectedDoc = documents.find((doc) => doc.id === selectedDocumentId);

  return (
    <Card
      className={`text-slate-800 bg-white w-full flex flex-col gap-2 rounded-2xl shadow-lg transition-all ease-in-out duration-300 ${
        isCollapsed
          ? "h-[50px] md:h-full w-full md:min-w-[60px] md:w-[60px]"
          : "min-w-[300px] md:min-w-[430px] md:w-[40%] h-full"
      }`}
    >
      <CardHeader>
        <CardTitle className="border-b border-slate-300 p-1">
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <p className="text-muted-foreground text-sm font-medium pl-2 md:pl-4">
                Sources
              </p>
            )}
            <div
              className={`text-muted-foreground cursor-pointer transition-colors duration-200 ${
                isCollapsed
                  ? "h-9 w-full flex items-center justify-center rounded-t-lg hover:bg-gray-100/50"
                  : "w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
              }`}
              onClick={toggleCollapse}
            >
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {isCollapsed ? (
                      <PanelLeft
                        size={16}
                        className="text-muted-foreground/80 hover:text-muted-foreground transition-colors"
                      />
                    ) : (
                      <PanelLeft
                        size={18}
                        className="text-muted-foreground/80 hover:text-muted-foreground transition-colors"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={8}
                    className="text-xs font-medium"
                  >
                    {isCollapsed ? "Expand panel" : "Collapse panel"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {isCollapsed ? (
        <CardContent className="md:flex flex-col justify-center items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="icon"
                className="hover:bg-gray-200/70 bg-gray-100"
              >
                <Plus size={18} className="text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Add Source</TooltipContent>
          </Tooltip>
          {selectedDocumentId && selectedDoc && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="cursor-pointer flex flex-col p-2 items-center justify-center text-sm text-slate-100 rounded-md hover:bg-gray-100">
                    {getFileIcon(selectedDoc.extension, selectedDoc.name)}
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
        <CardContent className="flex flex-col h-full justify-start p-2 md:px-4 items-center gap-3 md:gap-5">
          <div className="w-full flex gap-2 md:gap-3 px-2 md:px-1">
            <AddSource />
          </div>
          <div className="w-full flex flex-col rounded-2xl px-2 md:px-4">
            {documents && (
              <div className="w-full  text-muted-foreground font-semibold text-sm mb-2">
                Select Document
              </div>
            )}
            <div className="flex flex-col h-[300px] md:h-[470px] overflow-y-hidden hover:overflow-y-scroll rounded-2xl rounded-t-none py-1 space-y-1 bg-white relative">
              {documents ? (
                documents.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectDocument(item)}
                    className={`
                      flex items-center justify-between gap-3 px-2 py-2 rounded-xl cursor-pointer
                      transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] 
                      border border-transparent
                      group
                      ${
                        selectedDocumentId === item.id
                          ? "bg-gray-100"
                          : "bg-white hover:bg-gray-100/80"
                      }
                    `}
                  >
                    <div className="w-[330px] flex gap-4 justify-between items-center">
                      <div className="flex items-center gap-3 min-w-0">
                        <div>{getFileIcon(item.extension, item.name)}</div>

                        {/* Marquee container */}
                        <div className="max-w-full overflow-x-scroll">
                          <p className="text-sm pr-2 text-muted-foreground font-medium whitespace-nowrap">
                            {item.name}
                          </p>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <DropdownMenu>
                            <TooltipTrigger asChild>
                              <DropdownMenuTrigger asChild>
                                <EllipsisVertical
                                  size={30}
                                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200/70 rounded-full p-1 cursor-pointer"
                                  onClick={(event) => {
                                    event.stopPropagation(); // Prevents parent click from triggering
                                  }}
                                />
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="mt-2">
                              More
                            </TooltipContent>
                            <DropdownMenuContent
                              align="right"
                              className="w-40 md:ml-24 translate-x-4 text-muted-foreground font-medium text-sm"
                            >
                              <DropdownMenuItem
                                onClick={(event) => {
                                  event.stopPropagation(); // Also prevent propagation inside menu
                                  handleCopyName(item.name);
                                }}
                                className="hover:bg-gray-100/80"
                              >
                                Copy Name
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600/70 hover:bg-red-100"
                                onClick={(event) => event.stopPropagation()} // Prevent propagation here too
                              >
                                Remove Document
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full w-full flex flex-col gap-4 text-muted-foreground  justify-center  items-center">
                  <FileText size={60} className="text-gray-200" />
                  <p className="text-center text-sm font-medium text-muted-foreground/80">
                    Click{" "}
                    <span className="text-muted-foreground text-sm font-semibold p-1 rounded-lg">
                      Add Source
                    </span>{" "}
                    above to add PDFs,DOCX to view in detail.{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
      <Toaster className='bg-green-500' />
    </Card>
  );
};

export default DocumentSearchTab;
