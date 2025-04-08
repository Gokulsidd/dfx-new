"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useStore from "@/store/useStore";

const ChatDocumentTab = ({tab}) => {
  const { selectedDocumentId, toggleItem, tabsList } = useStore();
  const iframeRef = useRef(null)

  const iframeUrl = useMemo(() => {
    if (!selectedDocumentId) return tab.url.replace('${selectedDocumentId}', '');
    return tab.url.replace('${selectedDocumentId}', selectedDocumentId);
  }, [tab.url, selectedDocumentId]);
  
  const handleClose = () => {
    const chatTab = tabsList?.find((item) => item.name === "Chat");
    if (chatTab) {
      toggleItem("options", chatTab); 
    }
  };

  
  return (
    <Card
    className={` text-slate-800 h-full flex flex-col rounded-2xl shadow-sm w-full `}
    >
      <CardHeader>
        <CardTitle className={"border-b border-slate-300 p-1"}>
          <div className="flex justify-between items-center">
              <div className="flex justify-start items-center pl-4 p-1 gap-1 md:h-8 h-11"><span className="text-muted-foreground"><Bot size={16} /></span><p className="text-muted-foreground text-sm font-medium">{tab?.name || 'Chat'}</p></div>
            <div
              className={`text-muted-foreground text-sm cursor-pointer hover:bg-gray-200 w-8 h-8  flex items-center justify-center rounded-full`}
              onClick={handleClose}
            >
              <X size={16} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full flex-1 p-0">
      {console.log(iframeUrl)}
        <iframe src={iframeUrl} className="rounded-b-2xl w-full h-full border-none min-h-[500px]" title="chat-with-document" ref={iframeRef} ></iframe>
      </CardContent>
    </Card>
  );
};

export default ChatDocumentTab;
