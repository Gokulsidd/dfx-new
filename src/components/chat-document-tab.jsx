"use client";

import { useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useStore from "@/store/useStore";

const ChatDocumentTab = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedDocumentId, toggleItem  } = useStore();
  const iframeRef = useRef(null)
  
  const toggleCollapse = () => {
    toggleItem("options", { id: 3, label: "Chat" });
  };

  return (
    <Card
    className={` text-slate-800 h-full flex flex-col rounded-2xl shadow-sm  ${
      isCollapsed ? "w-[50px]" : "w-full"
    }`}
    >
      <CardHeader>
        <CardTitle className={"border-b border-slate-300 p-1"}>
          <div className="flex justify-between items-center">
            {!isCollapsed && (
              <div className="flex justify-start items-center pl-4 p-1 gap-1 md:h-8 h-11"><span className="text-muted-foreground"><Bot size={16} /></span><p className="text-muted-foreground text-sm font-medium">Chat</p></div>
            )}
            <div
              className={`text-muted-foreground text-sm cursor-pointer hover:bg-gray-200 w-8 h-8  flex items-center justify-center rounded-full`}
              onClick={toggleCollapse}
            >
              <X size={16} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {!isCollapsed && <CardContent className="w-full h-full flex-1 p-0">
        <iframe src={`http://10.115.14.14/dfxsearch/dfxchat/${selectedDocumentId}`} className="rounded-b-2xl w-full h-full border-none min-h-[500px]" title="chat-with-document" ref={iframeRef} ></iframe>
        </CardContent>}
    </Card>
  );
};

export default ChatDocumentTab;
