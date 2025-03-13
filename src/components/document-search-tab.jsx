"use client";

import { useEffect, useState } from "react";
import { Search, PanelLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import useStore from "@/store/useStore";
import AddDocument from "./add-document";
import { Input } from "./ui/input";
import { mockData, TabsData } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const DocumentSearchTab = ({ title, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [documents, setDocuments] = useState([]);
  const { selectedDocumentId, setSelectedDocumentId, toggleItem } = useStore();

  useEffect(() => {
    setDocuments(mockData);
  }, []);

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

  return (
    <Card
      className={` text-slate-800 w-full flex flex-col gap-4 rounded-2xl shadow-lg transition-all ease-in-out duration-300  ${
        isCollapsed
          ? "h-[50px] md:h-full  w-full md:w-[60px]"
          : "min-w-[280px] md:min-w-[30%] md:w-[30%] h-full "
      }`}
    >
      <CardHeader>
        <CardTitle className={"border-b border-slate-300 p-1"}>
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <p className="text-muted-foreground text-sm font-medium pl-4">
                Document Search
              </p>
            )}
            <div
              className={`text-muted-foreground  cursor-pointer hover:bg-gray-200 ${
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
                        className="cursor-pointer w-13 md:h-8 h-9 p-1  flex items-center justify-center rounded-t-2xl"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">Search Document</TooltipContent>
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
        <CardContent className={"md:flex justify-center items-center hidden "}>
          {selectedDocumentId && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="cursor-pointer flex flex-col px-2 py-1 items-center justify-center text-sm text-slate-100 rounded-md bg-indigo-400/70 hover:bg-indigo-400/90 border border-indigo-300">
                    <p>{selectedDocumentId}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Document ID {selectedDocumentId}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardContent>
      ) : (
        <CardContent className="p-3 flex justify-center items-center">
          <div className="flex flex-col justify-start items-center gap-5">
            <div className="flex w-full gap-1 h-10">
              {/* <Input
                placeholder="Enter Document ID or Pack"
                className={'opacity-70 h-[40px] border border-gray-300'}
              />
              <Button variant="primary" className={'border border-gray-300 bg-gray-100 text-muted-foreground  h-full w-10 hover:text-indigo-50 dark:hover:text-indigo-50 hover:bg-indigo-500/80'} >
                <Search size={18} />
              </Button> */}
              <AddDocument />
            </div>
            <div className="w-full flex flex-col gap-2 p-2">
              <p className="text-muted-foreground text-sm  font-medium">
                Document List
              </p>
              <div className="flex flex-col gap-1 h-[400px] overflow-y-auto">
                <Table className="w-full">
                  <TableBody className={"space-y-1"}>
                    {documents.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`md:w-sm hover:bg-indigo-100 cursor-pointer flex gap-2 rounded-md  p-2 ${
                          selectedDocumentId === item.id
                            ? "bg-indigo-100 border border-indigo-200"
                            : ""
                        }`}
                        onClick={() => handleSelectDocument(item)}
                      >
                        <TableCell className="text-md  text-slate-600 p-0">
                          {item.id}
                        </TableCell>
                        <TableCell className={"text-md text-slate-600 p-0"}>
                          {item.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DocumentSearchTab;
