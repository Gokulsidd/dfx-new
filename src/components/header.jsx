"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import useStore from "../store/useStore";
import { EllipsisVertical, User } from "lucide-react"; // Import the User icon from Lucide React
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getMockTabsResponse, tabsList, mockUserData } from "@/lib/constants";




const Header = () => {
  const {
    selectedTabs,
    toggleItem,
    user,
    fetchUser,
    setUser,
    selectedDocumentId,
    fetchTabsListForDashboard,
    dashboardId,
    tabsList
  } = useStore();

  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setUser(mockUserData); // Simulated user data
    // fetchUser()
    setLoading(false);
  };

  useEffect(() => {
    // const mockTabs = getMockTabsResponse()
    // setTabsList(mockTabs?.dashboardPageColumn)
    fetchTabsListForDashboard()
    getUser();
  }, [dashboardId]);

  const handleSelectAll = () => {
    const selectedIds = selectedTabs.options?.map((tab) => tab.id) || [];
    const isAllSelected = tabsList?.every((item) => selectedIds.includes(item.id));
   
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

  const handleLogin = () => {
    getUser();
  };

  return (
    <div className="w-full flex justify-between items-center px-2 pr-4 py-1">
      <div>
        <h1 className="text-md font-extrabold tracking-wider text-white py-1 px-3 bg-gray-900 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-gray-700 relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-40"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-md"></span>
          <span className="relative z-10">DFX</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={!selectedDocumentId}
              className="h-9 w-9 p-0 text-muted-foreground/70 hover:text-muted-foreground hover:bg-gray-100/50 transition-colors focus-visible:ring-1 focus-visible:ring-gray-200"
            >
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex hover:bg-gray-200 p-1 rounded-full">
                      {" "}
                      {/* Ensures proper wrapping */}
                      <EllipsisVertical
                        size={18}
                        className="shrink-0 cursor-pointer "
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-xs font-medium mt-4 "
                  >
                    Select tabs
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-48 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
            align="end"
            sideOffset={4}
          >
            {/* Select All Checkbox with Tooltip */}
                  <DropdownMenuItem
                    onClick={handleSelectAll}
                    className="p-2 text-sm flex items-center gap-2 text-muted-foreground font-medium hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
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
                          el.indeterminate = !isAllSelected && isSomeSelected; // Partial selection state
                        }
                      }}
                      className="h-3 w-3 cursor-pointer accent-gray-600/50"
                    />
                    Select All
                  </DropdownMenuItem>

            {/* Individual Checkboxes with Tooltips */}
            <div className="flex flex-col gap-1">
              {console.log(tabsList)}
              {tabsList?.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => toggleItem("options", item)}
                  className={`p-2 text-sm flex items-center gap-2 text-muted-foreground font-medium transition-colors focus:bg-gray-100 dark:focus:bg-gray-700 ${
                    selectedTabs.options?.some((tab) => tab.id === item.id)
                      ? "bg-gray-100 dark:bg-gray-700/80 "
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
                  {console.log(item)}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              {/* You could add a status indicator here if needed */}
              {/* <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span> */}
            </div>
            <div className="flex md:flex-row flex-col justify-center items-start md:gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.User.Name.split("\\").pop()}{" "}
                {/* Extracts just the username after backslash */}
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
