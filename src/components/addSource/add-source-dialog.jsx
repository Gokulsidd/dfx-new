"use client";
import { useEffect, useState } from "react";
import TagInput from "../tagsInput";
import { Button } from "../ui/button";

import useStore from "@/store/useStore";

import Loader from "../loader";
import { toast } from "sonner";
import { errorToastObj } from "@/lib/constants";
import Collections from "../collections/collections";

const AddSourceDialog = () => {
  const [loading, setLoading] = useState(false);

  const {
    setDocumentsList,
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
    saveWorkSpaceCollection,
  } = useStore();

  useEffect(() => {
    setAddSourceDialog(true);

    return () => {
      setAddSourceDialog(false)
    }
  }, [])

  const saveWorkspace = async () => {
    const workspaceName = showNewCollectionInput
      ? newCollectionName
      : selectedCollection?.workspaceName;
    const workspaceId = selectedCollection?.id;
    const userId = user?.User.ID;
    await saveWorkSpaceCollection(
      [...collectionTags, ...tags],
      workspaceId,
      workspaceName,
      showNewCollectionInput,
      userId,
      selectedCollection
    );
  };

  const handleSearchClick = async () => {
    console.log("Input Tags:", [...collectionTags, ...tags]);
    if (showNewCollectionInput) {
      console.log("New Collection Name:", newCollectionName);
    } else if (!showNewCollectionInput && selectedCollection) {
      console.log("Selected Collection:", selectedCollection);
    }

    setLoading(true);
    try {
      // save and search only when there is a collection selected or else just search for docs
      if (selectedCollection || showNewCollectionInput) {
        await saveWorkspace();
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
    <div className="flex flex-col justify-start  gap-12 w-full h-full py-6 px-10">
      <div className="flex flex-col gap-2 px-4">
        <p className="font-bold text-[#0D141C] text-md px-2">
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
          disabled={[...tags, ...collectionTags]?.length === 0}
        >
          {loading ? (
            <Loader width={4} height={4} />
          ) : selectedCollection ? (
            "Save and Search"
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddSourceDialog;
