"use client";
import { useState } from "react";
import TagInput from "../tagsInput";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useStore from "@/store/useStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { PlusCircle } from "lucide-react"; // Removed Search, Trash2, SquareLibrary as they are in sub-components
import Loader from "../loader";
import { toast } from "sonner";
import { errorToastObj } from "@/lib/constants";
import Collections from "../collections/collections";

const AddSourceDialog = () => {
  const [loading, setLoading] = useState(false);

  const {
    setDocumentsList,
    isAddSourceDialogOpen,
    setAddSourceDialog,
    setUploadDocumentDialog,
    user,
    tags,
    setTags,
    configs,
    setSelectedDocumentId,
    setSelectedCollection,
    selectedCollection,
    setCollectionTags,
    collectionTags,
    newCollectionName,
    showNewCollectionInput,
    saveWorkSpaceCollection
  } = useStore();

  const saveWorkspace = async () => {
    const workspaceName = showNewCollectionInput ? newCollectionName : selectedCollection?.workspaceName;
    const workspaceId = selectedCollection?.id
    const userId = user?.User.ID
    await saveWorkSpaceCollection([...collectionTags, ...tags],workspaceId,  workspaceName, showNewCollectionInput, userId, selectedCollection)
  }

  const handleSearchClick = async () => {
    console.log("Input Tags:", [...collectionTags, ...tags]);
    if (showNewCollectionInput) {
      console.log("New Collection Name:", newCollectionName);
    } else if(!showNewCollectionInput && selectedCollection) {
      console.log("Selected Collection:", selectedCollection);
    }

    setLoading(true);
    try {
      
      // save and search only when there is a collection selected or else just search for docs
      if(selectedCollection || showNewCollectionInput){
        await saveWorkspace()
      }

      const columnDetailMasterId = user?.User?.ColumnDetailMaster?.[0]?.Id;
      if (!columnDetailMasterId) {
        toast.error("User column detail ID not available", errorToastObj);
        return;
      }

      const res = await setDocumentsList(tags, columnDetailMasterId);
      if (res?.data?.Documents?.[0]?.ID) {
        setSelectedDocumentId(res.data.Documents[0].ID);
      }

      setAddSourceDialog(false);
      setUploadDocumentDialog(false);
      
      if (res?.length === 0) {
        toast.error("No files found", errorToastObj);
      }
    } catch (error) {
      console.error("Error setting document list", error);
      toast.error("Something went wrong while searching.", errorToastObj);
    } finally {
      setLoading(false);
    }
  };

  const handleClearClick = () => {
    setTags([]);
    setCollectionTags([]);
    setSelectedCollection(null);
  };

  return (
    <Dialog open={isAddSourceDialogOpen} onOpenChange={setAddSourceDialog}>
      <div className="w-full h-full text-center">
        <DialogTrigger asChild>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setAddSourceDialog(true)}
                  variant="ghost"
                  className="group w-full h-[170px] rounded-[50px] p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-50 flex flex-col items-center justify-center gap-4"
                >
                  <div className="relative">
                    <PlusCircle className="w-12 h-12 text-gray-300 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-medium text-gray-600 transition-colors duration-200">
                      {configs?.labels.add_source.label}
                    </span>
                    <span className="text-sm text-gray-400 transition-colors duration-200">
                      {configs?.labels.add_source.sub_heading}
                    </span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full md:max-w-3xl lg:max-w-6xl h-[700px] flex flex-col justify-start  bg-white rounded-4xl px-12">
        <DialogHeader>
          <DialogTitle className={"hidden"}>Add Source</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-start  gap-16 w-full h-full py-8 px-1">
          <div className="flex flex-col gap-2 h-fit">
            <p className="font-bold text-[#0D141C] text-xl px-2">
              Search Documents 
            </p>
            <TagInput />
          </div>
          <div>
            <Collections />
          </div>
          <div className="w-full h-fit flex gap-3 justify-end items-center">
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
              disabled={[...tags,...collectionTags]?.length === 0 }
            >
              {loading ? <Loader width={4} height={4} /> : selectedCollection ? 'Save and Search' : 'Search'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
