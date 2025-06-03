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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useStore from "@/store/useStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FolderPlus, Plus } from "lucide-react";
import Loader from "../loader";
import FileDropper from "../file-dropper";

const UploadInFolder = () => {
  const [loading, setLoading] = useState(false);
  const {
    setDocumentsList,
    isAddSourceDialogOpen,
    setAddSourceDialog,
    isCollapsed,
    user,
    tags,
    setTags,
    configs
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
    <Dialog>
      <div className="w-full h-full text-center">
        <DialogTrigger asChild>
          <Tooltip>
            <Button
              onClick={() => setAddSourceDialog(true)}
              variant="ghost"
              className="group w-full h-[170px] rounded-[50px] p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-50  flex flex-col items-center justify-center gap-4"
            >
              <div className="relative">
                <FolderPlus className="w-12 h-12 text-gray-300 group-hover:text-blue-300 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium text-gray-600  transition-colors duration-200">
                 {configs?.labels.client_folder.label}
                </span>
                <span className="text-sm text-gray-400  transition-colors duration-200">
                  {configs?.labels.client_folder.sub_heading}
                </span>
              </div>
            </Button>
          </Tooltip>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full md:max-w-3xl lg:max-w-4xl h-[700px] flex flex-col py-4 bg-white rounded-4xl">
        <DialogHeader className="flex items-start h-fit p-2">
          <DialogTitle className="text-muted-foreground font-medium text-lg hidden">
            Add Source
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-start flex-1">
          <Tabs defaultValue="MyDocuments" className="w-full h-full">
            <TabsList className="w-full h-13 flex justify-center overflow-x-auto overflow-y-hidden bg-white">
              <TabsTrigger value="input">Document IDs</TabsTrigger>
            </TabsList>

            <TabsContent
              value="input"
              className="flex flex-col justify-start gap-6 w-full h-full rounded-lg p-4 px-16"
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
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInFolder;
