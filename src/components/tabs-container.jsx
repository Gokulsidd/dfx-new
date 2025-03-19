"use client";

import { lazy, Suspense } from "react";
import DocumentSearchTab from "./document-search-tab";
import useStore from "@/store/useStore";
import { Skeleton } from "./ui/skeleton";
import NoDocumentSelected from "./no-document-selected";

const ChatDocumentTab = lazy(() => import("./chat-document-tab"))
const MetaDataTab = lazy(() => import("./metadata-tab"))
const PreviewTab = lazy(() => import("./preview-tab"));

const TabsContainer = () => {
  const { selectedTabs } = useStore();

  return (
    <div className="h-full">
      {/* Desktop View */}
      <div className="block h-full">
        <main className="w-full h-full flex flex-col md:flex-row justify-start items-center gap-3 px-2">
          <DocumentSearchTab />
          {selectedTabs.options?.length === 0 && <NoDocumentSelected /> }
          <Suspense fallback={<Skeleton className={'w-full h-full bg-gray-200/70 rounded-2xl'} />} >
          {selectedTabs.options?.some((item) => item.label === "Metadata") && (<MetaDataTab />)}
          {selectedTabs.options?.some((item) => item.label === "Preview") && (<PreviewTab />)}
          {selectedTabs.options?.some((item) => item.label === "Chat") && (<ChatDocumentTab />)}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default TabsContainer;
