"use client";

import { lazy, Suspense, useMemo } from "react";
import DocumentSearchTab from "./document-search-tab";
import useStore from "@/store/useStore";
import { Skeleton } from "../ui/skeleton";
import NoDocumentSelected from "../no-document-selected";
import GenericTab from "./generic-tab";
import { FileText } from "lucide-react";

const ChatDocumentTab = lazy(() => import("./chat-document-tab"));
const MetaDataTab = lazy(() => import("./metadata-tab"));
const PreviewTab = lazy(() => import("./preview-tab"));

const TabsContainer = () => {
  const { selectedTabs, tabsList, selectedDocumentId } = useStore();

  // Sort the selected tabs by sequence
  const orderedTabs = useMemo(() => {
    return [...selectedTabs.options].sort((a, b) => a.seq - b.seq);
  }, [selectedTabs.options]);



  const renderTabComponent = (tab) => {
    switch (tab.name) {
      case "Metadata":
        return <MetaDataTab key={tab.id} tab={tab} />;
      case "Preview":
        return <PreviewTab key={tab.id} tab={tab} />;
      case "Chat":
        return <ChatDocumentTab key={tab.id} tab={tab} />;
      // default:
      //   return (
      //     <GenericTab
      //       key={tab.id}
      //       tab={tab}
      //       icon={FileText} // static icon for now
      //       title={tab.title || tab.name}
      //       iframeSrc={getIframeUrl(tab.url)}
      //     />
      //   );
    }
  };

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed("Tabs Container Debug");
    console.log("%cSelected Tabs:", "color: #2196F3; font-weight: bold;", selectedTabs.options);
    console.log("%cAvailable Tabs:", "color: #FF9800; font-weight: bold;", tabsList?.map((t) => t.name));
    console.log("%cSelected Doc IDs:", "color: #9C27B0; font-weight: bold;", selectedDocumentId);
    console.groupEnd();
  }

  return (
    <div className="h-full">
      <main className="w-full h-full flex flex-col md:flex-row justify-start items-center gap-3 px-2">
        <DocumentSearchTab />

        {selectedTabs.options?.length === 0 && <NoDocumentSelected />}

        <Suspense
          fallback={
            <div className="w-full h-full flex gap-3">
              <Skeleton className="w-full h-full bg-gray-200/70 rounded-2xl" />
            </div>
          }
        >
          {orderedTabs.map((tab) => renderTabComponent(tab))}
        </Suspense>
      </main>
    </div>
  );
};

export default TabsContainer;
