"use client";

import { FileSearch, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import useStore from "@/store/useStore";

const PreviewTab = ({ tab }) => {
  const { selectedDocumentId, toggleItem, tabsList } = useStore();
  const iframeContainerRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(Date.now()); // force iframe reload on resize

  const iframeUrl = useMemo(() => {
    if (!selectedDocumentId) return "";
    let url = tab.url
      .replace("${selectedDocumentId}", selectedDocumentId)
      .replace("${REPO_NAME}", process.env.NEXT_PUBLIC_REPOSITORY_NAME || "LFRepo");

    if (url.includes("newfile=")) {
      url = url.replace("A6vxMjA7.dat", `${selectedDocumentId}.dat`);
    }

    return url;
  }, [tab.url, selectedDocumentId]);

  const handleClose = () => {
    const previewTab = tabsList?.find((item) => item.name === "Preview");
    if (previewTab) {
      toggleItem("options", previewTab);
    }
  };

  // 🔁 Resize observer to trigger iframe reload
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      // Reset iframe key to trigger re-render
      setIframeKey(Date.now());
    });

    if (iframeContainerRef.current) {
      observer.observe(iframeContainerRef.current);
    }

    return () => {
      if (iframeContainerRef.current) {
        observer.unobserve(iframeContainerRef.current);
      }
    };
  }, []);

  return (
    <Card className="text-slate-800 h-full flex flex-col rounded-2xl shadow-sm w-full">
      <CardHeader>
        <CardTitle className="border-b border-slate-300 p-1">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center pl-4 p-1 gap-1 h-8">
              <span className="text-muted-foreground">
                <FileSearch size={16} />
              </span>
              <p className="text-muted-foreground text-sm font-medium">{tab.name}</p>
            </div>
            <div
              className="text-muted-foreground cursor-pointer hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full"
              onClick={handleClose}
            >
              <X size={16} />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex-1 p-0" ref={iframeContainerRef}>
        {iframeUrl && (
          <iframe
            key={iframeKey} // 👈 this causes re-render
            src={iframeUrl}
            className="w-full h-full border-none min-h-[500px] rounded-b-2xl"
            title="Preview"
          ></iframe>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewTab;
