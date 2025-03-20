"use client";

import { FileSearch, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import useStore from "@/store/useStore";

const PreviewTab = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedDocumentId, toggleItem } = useStore();

  const toggleCollapse = () => {
    toggleItem("options", { id: 2, label: "Preview" });
  };

  return (
    <Card
      className={` text-slate-800 h-full flex flex-col rounded-2xl shadow-sm ${
        isCollapsed ? "w-[50px]" : "w-full"
      }`}
    >
      <CardHeader>
        <CardTitle className={"border-b border-slate-300 p-1"}>
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <div className="flex justify-start items-center pl-4 p-1 gap-1 h-8">
                <span className="text-muted-foreground">
                  <FileSearch size={16} />
                </span>
                <p className="text-muted-foreground text-sm font-medium ">Preview</p>
              </div>
            )}
            <div
              className={`text-muted-foreground cursor-pointer hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full`}
              onClick={toggleCollapse}
            >
              <X size={16} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="w-full h-full flex-1 p-0">
          <iframe
            src={`http://localhost/DFXDMSLite/dfxsync_demo/ApryseDoc/Index?id=${selectedDocumentId}&repository=LFRepo&readonlyflag=1&newfile=A6vxMjA7.dat&docpreview=1&FileName=VEVTVCAoOCkuZG9jeA==`}
            className="w-full h-full border-none min-h-[500px] rounded-b-2xl"
          ></iframe>
        </CardContent>
      )}
    </Card>
  );
};

export default PreviewTab;
