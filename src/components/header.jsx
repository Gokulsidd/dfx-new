"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import useStore from "../store/useStore";
import { Columns3, EllipsisVertical, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { mockData } from "@/lib/constants";
import Image from "next/image";

const Header = () => {
  const {
    selectedTabs,
    toggleItem,
    user,
    selectedDocumentId,
    tabsList,
    documentsList,
  } = useStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const selectedDoc =
    documentsList?.filter((doc) => doc.ID === selectedDocumentId) || [];
  
  return (
    <div className="w-full flex justify-between items-center px-3 pr-4 pb-2">
      <div className="flex gap-4 justify-center items-center">
        <Image src={"/favicon.png"} alt="logo" width={50} height={50} />
        {selectedDoc[0] && (
          <div className="flex gap-3 p-1 justify-start items-center h-full">
            <p className="text-gray-900/80 font-bold text-xl">
              {selectedDoc[0].FileName}{" "}
            </p>
            <p className="text-muted-foreground text-sm h-fit mt-1">
              ({selectedDoc[0].ID})
            </p>
          </div>
        )}
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
                  <div className="flex justify-center items-center hover:bg-gray-200 p-1 rounded-full w-10 h-10">
                    <Columns3 size={18} className="shrink-0 cursor-pointer" />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-xs font-medium mt-4"
                >
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
