"use client";

import { SquareCode, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import useStore from "@/store/useStore";

const MetaDataTab = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedDocumentId, toggleItem } = useStore();

  const toggleCollapse = () => {
    toggleItem("options", { id: 1, label: "Metadata" });
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card
      className={`text-slate-800 h-full  flex flex-col rounded-2xl shadow-sm transition-all duration-300  ${
        isCollapsed ? "w-[50px] min-w-[50px]" : "w-full"
      }`}
    >
      <CardHeader>
        <CardTitle className="border-b border-slate-300 p-1">
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <div className="flex justify-start items-center pl-4 gap-1 h-8">
                <span className="text-muted-foreground">
                  <SquareCode size={16} />
                </span>
                <p className="text-muted-foreground text-sm font-medium">Meta Data</p>
              </div>
            )}
            <button
              className="text-muted-foreground cursor-pointer hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full"
              onClick={toggleCollapse}
            >
              <X  size={16} />
            </button>
          </div>
        </CardTitle>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="w-full h-full flex-1 p-0">
          <iframe
            src={`http://localhost/DFXDMSLite/dfxwebapp_demo/Email/MailProperty?id=${selectedDocumentId}`}
            className="w-full h-full border-none min-h-[500px] rounded-b-2xl"
          />
        </CardContent>
      )}
    </Card>
  );
};

export default MetaDataTab;
