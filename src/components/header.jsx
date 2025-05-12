"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import useStore from "../store/useStore";
import { EllipsisVertical, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { mockData } from "@/lib/constants";

const Header = () => {
  const {
    selectedTabs,
    toggleItem,
    user,
    selectedDocumentId,
    tabsList,
    documentsList
  } = useStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAll = () => {
    const selectedIds = selectedTabs.options?.map((tab) => tab.id) || [];
    const isAllSelected = tabsList?.every((item) =>
      selectedIds.includes(item.id)
    );

    if (isAllSelected) {
      tabsList?.forEach((item) => toggleItem("options", item, false));
    } else {
      tabsList?.forEach((item) => {
        if (!selectedIds.includes(item.id)) {
          toggleItem("options", item, true);
        }
      });
    }
  };

  console.log(mockData?.Documents, 'helokokoo')
  const selectedDoc = mockData?.Documents.filter((doc) => doc.ID === selectedDocumentId )

  return (
    <div className="w-full flex justify-between items-center px-3 pr-4 pt-1 pb-2">
      <div className="flex gap-8 justify-center items-center">
        <h1 className="text-md font-extrabold tracking-wider text-white py-1 px-3 bg-gray-900 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-gray-700 relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-40"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-md"></span>
          <span className="relative z-10">DFX</span>
        </h1>
        {selectedDoc && <p>{selectedDoc[0]?.FileName} <span>{selectedDoc[0]?.ID}</span> </p>}
        
      </div>
      <div className="flex items-center gap-4">
        {/* Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="sm"
            disabled={!selectedDocumentId}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-9 w-9 p-0 text-muted-foreground/70 hover:text-muted-foreground hover:bg-gray-100/50 transition-colors focus-visible:ring-1 focus-visible:ring-gray-200"
          >
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex hover:bg-gray-200 p-1 rounded-full">
                    <EllipsisVertical size={18} className="shrink-0 cursor-pointer" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs font-medium mt-4">
                  Select tabs
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 z-50 p-2">
              <div
                onClick={handleSelectAll}
                className="p-2 text-sm flex items-center gap-2 text-muted-foreground font-medium hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  ref={(el) => {
                    if (el) {
                      const selectedIds =
                        selectedTabs.options?.map((tab) => tab.id) || [];
                      const isAllSelected = tabsList?.every((item) =>
                        selectedIds.includes(item.id)
                      );
                      const isSomeSelected = tabsList?.some((item) =>
                        selectedIds.includes(item.id)
                      );

                      el.checked = isAllSelected;
                      el.indeterminate = !isAllSelected && isSomeSelected;
                    }
                  }}
                  className="h-3 w-3 cursor-pointer accent-gray-600/50"
                />
                Select All
              </div>

              <div className="flex flex-col gap-1">
                {tabsList?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem("options", item)}
                    className={`p-2 text-sm flex items-center gap-2 text-muted-foreground font-medium transition-colors rounded cursor-pointer ${
                      selectedTabs.options?.some((tab) => tab.id === item.id)
                        ? "bg-gray-100 dark:bg-gray-700/80"
                        : "hover:bg-gray-100/80 dark:hover:bg-gray-100/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTabs.options?.some(
                        (tab) => tab.id === item.id
                      )}
                      readOnly
                      className="h-3 w-3 cursor-pointer accent-gray-600/50"
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-center items-start md:gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.User.Name.split("\\").pop()}
              </span>
              {/* <span className="text-xs mt-[1.2px] text-gray-500 dark:text-gray-400">
                ({user.User.Roles[0]?.RoleName || "User"})
              </span> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
