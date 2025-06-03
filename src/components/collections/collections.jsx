"use client";
import React, { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Search,
  Trash2,
  SquareLibrary,
  Filter,
  SortAsc,
  Plus,
  EllipsisVertical,
  Trash,
  Edit,
  SortDesc,
  Copy,
} from "lucide-react";
import useStore from "@/store/useStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { successToastObj } from "@/lib/constants";
import { Label } from "../ui/label";

const Collections = () => {
  const {
    uploadedFiles,
    collections,
    sortCollections,
    setSelectedCollection,
    selectedCollection,
    setCollectionTags,
    newCollectionName,
    setNewCollectionName,
    showNewCollectionInput,
    setShowNewCollectionInput,
    isDeleteCollectionDialogOpen,
    setDeleteCollectionDialog,
    isEditCollectionDialogOpen,
    setEditCollectionDialog,
    deleteWorkSpaceCollection,
    updateWorkSpaceCollection
  } = useStore();

  const [searchCollectionQuery, setSearchCollectionQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('')

  const filteredCollections = useMemo(() => {
    return collections.filter((item) =>
      item.workspaceName
        .toLowerCase()
        .includes(searchCollectionQuery.toLowerCase())
    );
  }, [collections, searchCollectionQuery]);

  const handleCopyName = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      toast.success("Copied to clipboard!", successToastObj);
    } catch (err) {
      toast.error("Failed to copy name.");
    }
  };

  const handleToggleSort = () => {
    sortCollections(collections, isSorted);
    setIsSorted(!isSorted);
  };

  const handleSelectCollection = (collection) => {
    if (collection?.id === selectedCollection?.id) {
      setSelectedCollection(null);
      setCollectionTags([]);
      return;
    }

    setSelectedCollection(collection);

    const newDocumentIds = collection.documents?.map((d) => d.documentID) || [];
    const updatedTagsArray = Array.from(new Set(newDocumentIds));
    setCollectionTags(newDocumentIds);
    console.log("Updated Tags with no duplicates:", updatedTagsArray);
  };

  const handleNewCollectionClick = () => {
    setShowNewCollectionInput(!showNewCollectionInput);
    setSelectedCollection(null); // Deselect any collection when switching
  };

  return (
    <div className={`w-full h-full flex flex-col gap-4 ${uploadedFiles?.length != 0 ? 'p-5 bg-gray-100/70 rounded-4xl' : '' }`}>
      {/* Toggle buttons */}
      <div className="flex gap-3 w-full justify-between items-center">
        <p className="font-bold text-[#0D141C] text-xl px-2">
          Add to Collections
        </p>
        <Button
          onClick={handleNewCollectionClick}
          className={
            "bg-gray-100 hover:bg-gray-200 text-muted-foreground text-sm hover:shadow-sm rounded-xl w-[180px]"
          }
        >
          <Plus size={16} />
          {showNewCollectionInput ? "Search Collections" : "New Collection"}
        </Button>
      </div>

      {showNewCollectionInput ? (
        <>
          {/* New Collection Input */}
          <div className="relative w-full">
            <Plus
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              type="text"
              placeholder="Enter collection name"
              className="pl-10 h-10 bg-white"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
          </div>

          <div className={`flex flex-col gap-3 ${uploadedFiles.length != 0 ? 'h-[200px]' : 'h-[220px]'} w-full bg-gray-100/70 border border-gray-200 overflow-y-auto p-3 px-6 rounded-xl`}>
            <div className="h-full w-full flex flex-col justify-center items-center text-center gap-1">
              <p className="text-muted-foreground font-medium">
                Enter a new collection name above.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Existing Collections Search */}
          <div className="flex gap-2">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search for collections"
                className="pl-10 h-10 bg-white shadow-none"
                value={searchCollectionQuery}
                onChange={(e) => setSearchCollectionQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 rounded-2xl transition-all duration-200 text-muted-foreground`}
              onClick={handleToggleSort}
              aria-label={isSorted ? "Sorted (A→Z)" : "Sorted (Z->A)"}
            >
              {isSorted ? <SortDesc size={20} /> : <SortAsc size={20} />}
            </Button>
          </div>

          {/* Existing Collections List */}
          <div className={`flex flex-wrap gap-3 ${uploadedFiles.length != 0 ? 'h-[200px]' : 'h-[220px]'} max-h-full w-full bg-gray-100/70 border border-gray-200 overflow-y-auto p-3 px-6 rounded-xl`}>
            {filteredCollections.length === 0 ? (
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-1">
                <p className="text-muted-foreground text-sm">
                  No collections found!
                </p>
                <p className="text-muted-foreground text-sm">
                  Start by creating a new collection
                </p>
              </div>
            ) : (
              filteredCollections.map((item) => (
                <div
                  key={item.id || item.workspaceName}
                  className={`flex justify-between items-center  ${uploadedFiles.length != 0 ? 'w-full ' : 'w-[240px]'} h-fit rounded-md shadow-sm px-4 py-2 border-l-8 cursor-pointer group transition-colors duration-200
                    border-blue-500  
                    ${
                      selectedCollection && selectedCollection.id === item.id
                        ? "bg-gray-800 text-white"
                        : "bg-white hover:bg-gray-700"
                    }`}
                  onClick={(e) => {
                    // Prevent clicks from inside dialog/input/buttons from selecting
                    const tag = e.target.tagName.toLowerCase();
                    if (["button", "input", "svg", "path"].includes(tag))
                      return;

                    handleSelectCollection(item);
                  }}
                >
                  <div
                    className={`flex items-center gap-3 font-medium text-sm  ${
                      selectedCollection && selectedCollection.id === item.id
                        ? "text-white "
                        : "text-muted-foreground group-hover:text-white"
                    }`}
                  >
                    <SquareLibrary size={18} />
                    <span className={`${uploadedFiles.length != 0 ? 'max-w-[300px]' : 'max-w-[130px]'} truncate `}>
                      {item.workspaceName}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical
                        size={30}
                        aria-label="more"
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600 rounded-full p-1 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="right"
                      className="w-fit md:ml-24 p-2 translate-x-4 text-muted-foreground font-medium text-sm rounded-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.stopPropagation(); // Also prevent propagation inside menu
                          handleCopyName(item.workspaceName);
                        }}
                        className="hover:bg-gray-100/80"
                      >
                        <span>
                          <Copy />
                        </span>{" "}
                        Copy Name
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-100 focus:bg-gray-100"
                        onClick={(e) => e.preventDefault()} // Only prevent default, not propagation
                      >
                        <Dialog
                          open={isEditCollectionDialogOpen}
                          onOpenChange={setEditCollectionDialog}
                        >
                          <DialogTrigger asChild>
                            <div className="flex w-full items-center gap-2">
                              <Edit className="h-4 w-4 text-muted-foreground" />
                              <span>Edit</span>
                            </div>
                          </DialogTrigger>
                          <DialogContent
                            className="w-full max-w-lg h-[260px] p-6 flex flex-col gap-8 rounded-4xl"
                            onPointerDownOutside={(e) => e.preventDefault()} // Prevents closing when clicking input
                          >
                            <DialogHeader className="flex flex-col gap-8">
                              <DialogTitle>Edit Collection Name</DialogTitle>
                              <div
                                className="flex flex-col w-full items-start justify-center gap-3"
                                onClick={(e) => e.stopPropagation()} // Only stop here
                              >
                                <input
                                  type="text"
                                  value={newWorkspaceName}
                                  className="w-full px-3 py-3 border rounded-xl bg-background text-sm focus:ring focus:ring-gray-300"
                                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                                  onKeyDown={(e) => e.stopPropagation()} 
                                />
                              </div>
                            </DialogHeader>

                            <DialogFooter className={"mt-10"}>
                              <Button
                                variant="outline"
                                className="text-muted-foreground text-sm hover:bg-gray-200"
                                onClick={() => setEditCollectionDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant={"outline"}
                                className="bg-gray-900/90 text-sm text-slate-50 w-fit min-w-[80px] px-4 py-2 float-right hover:bg-gray-900 rounded-2xl"
                                onClick={() => {
                                  updateWorkSpaceCollection(newWorkspaceName, item)
                                }}
                              >
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600/70 hover:bg-red-100 focus:bg-red-100"
                        onClick={(e) => e.preventDefault()} // Prevent immediate dropdown close
                      >
                        <Dialog
                          open={isDeleteCollectionDialogOpen}
                          onOpenChange={setDeleteCollectionDialog}
                        >
                          <DialogTrigger asChild>
                            <div className="flex w-full items-center gap-2">
                              <Trash className="h-4 w-4 text-red-600/70" />
                              <span>Delete</span>
                            </div>
                          </DialogTrigger>
                          <DialogContent
                            className="w-full max-w-lg h-[260px] p-6 flex flex-col gap-8 rounded-4xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DialogHeader className={"flex flex-col gap-8"}>
                              <DialogTitle>Delete Collection</DialogTitle>
                              <div
                                className={
                                  "flex flex-col w-full items-center justify-center gap-3"
                                }
                              >
                                <p className="text-md text-muted-foreground font-semibold">
                                  Are you sure you want to delete this
                                  collection ?
                                </p>
                                <div
                                  className={`flex justify-between items-center w-fit h-fit rounded-md shadow-sm px-4 py-2 border-l-8 cursor-pointer group transition-colors duration-200 border-blue-500 bg-gray-800 text-white`}
                                >
                                  <div
                                    className={`flex items-center gap-3 font-medium text-sm text-white`}
                                  >
                                    <SquareLibrary size={18} />
                                    <span className="max-w-[200px] truncate">
                                      {item.workspaceName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <DialogFooter className={"mt-6"}>
                              <Button
                                variant="outline"
                                className="text-muted-foreground text-sm hover:bg-gray-200"
                                onClick={() => setDeleteCollectionDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="outline"
                                className={
                                  "bg-red-600 text-white hover:bg-red-700"
                                }
                                onClick={() => {
                                  deleteWorkSpaceCollection(item)
                                }}
                              >
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Collections;
