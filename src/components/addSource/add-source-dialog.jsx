"use client";
import { useState } from "react";
import TagInput from "../tagsInput";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddSourceDropdown from "./add-source-dropDown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useStore from "@/store/useStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Plus } from "lucide-react";
import Loader from "../loader";

const AddSourceDialog = () => {
  const [loading, setLoading] = useState(false);
  const {
    setDocumentsList,
    isAddSourceDialogOpen,
    setAddSourceDialog,
    isCollapsed,
    user,
    tags,
    setTags,
  } = useStore();

  const handleSearchClick = async () => {
    console.log(tags);
    setLoading(true);
    try {
      const columnDetailMasterId = user?.User?.ColumnDetailMaster?.[0]?.Id;
      if (!columnDetailMasterId) {
        toast.error("User column detail not available");
        return;
      }
      await setDocumentsList(tags, columnDetailMasterId);
      setAddSourceDialog(false);
    } catch (error) {
      console.error("Error setting document list", error);
      toast.error("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearClick = () => {
    setTags([]);
  };

  return (
    <Dialog open={isAddSourceDialogOpen} onOpenChange={setAddSourceDialog}>
      <div className="w-full text-center">
        <DialogTrigger asChild>
          {isCollapsed ? (
            <Tooltip>
                <Button
                    onClick={() => setAddSourceDialog(true)}
                    className="w-full h-10 font-semibold text-sm text-muted-foreground bg-white custom-shadow hover:scale-105 hover:bg-white rounded-full"
                  >
                    Add Source
                  </Button>
            </Tooltip>
          ) : (
            <TooltipProvider>
              <Tooltip asChild>
                <TooltipTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    onClick={() => setAddSourceDialog(true)}
                    className="w-full h-10 font-semibold text-sm text-muted-foreground hover:bg-gray-100 rounded-full hover:border-gray-300"
                  >
                    <span className="text-xl">+</span> Add Source
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className={"mt-2"}>
                  add source
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogTrigger>
      </div>
      <DialogContent
        className="w-full md:max-w-lg md:h-[380px] flex flex-col gap-1 p-2 md:p-4 bg-white rounded-4xl"
      >
        <DialogHeader className="flex items-start h-fit p-2">
          <DialogTitle className="text-muted-foreground font-medium text-lg hidden">
            Add Source
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-start flex-1">
          <Tabs defaultValue="MyDocuments" className="w-full h-full">
            <TabsList className="w-full h-13 flex justify-start overflow-x-auto overflow-y-hidden bg-white">
              <TabsTrigger
                value="input"
                className="whitespace-nowrap font-semibold border-none text-muted-foreground text-lg  ml-3"
              >
                Document IDs
              </TabsTrigger>
              {/* <TabsTrigger value="selectPack" className="whitespace-nowrap">
                Select Pack
              </TabsTrigger> */}
            </TabsList>

            <TabsContent
              value="input"
              className="flex flex-col justify-between w-full h-full rounded-lg px-4 py-2"
            >
              <TagInput />
              <div className="w-full flex gap-3 justify-end items-center">
                <Button
                  variant={"outline"}
                  className="text-muted-foreground text-sm hover:bg-gray-200"
                  onClick={handleClearClick}
                >
                  Clear
                </Button>
                <Button
                  className="bg-gray-900/90 text-sm text-slate-50 w-fit min-w-[80px] px-4 py-2 float-right hover:bg-gray-900 rounded-2xl"
                  onClick={handleSearchClick}
                >
                  {loading ? <Loader width={4} height={4} /> : "Search"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent
              value="selectPack"
              className="w-full h-full rounded-lg p-0"
            >
              <AddSourceDropdown />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
