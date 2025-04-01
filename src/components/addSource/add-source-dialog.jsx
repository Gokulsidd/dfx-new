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

const AddSourceDialog = () => {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const { setDocumentsList } = useStore();

  const handleSearchClick = async () => {
    await setDocumentsList(tags);
    setOpen(false); 
  };

  const handleClearClick = () => {
    setTags([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full text-center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="dark:text-muted-foreground w-full h-10 font-light text-md text-muted-foreground hover:text-slate-50 dark:hover:text-indigo-50 hover:bg-indigo-900/80 rounded-3xl border-gray-300"
          >
            <span className="text-xl">+</span> Add Source
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent aria-describedby={undefined} className="w-full md:max-w-lg h-[60%] flex flex-col gap-1 p-2 md:p-4 bg-white">
        <DialogHeader className="flex items-start h-fit p-2">
          <DialogTitle className="text-muted-foreground font-medium text-lg">
            Add Source
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-start flex-1">
          <Tabs defaultValue="MyDocuments" className="w-full h-full">
            <TabsList className="w-full h-13 flex justify-center overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="input" className="whitespace-nowrap">
                Document IDs
              </TabsTrigger>
              <TabsTrigger value="selectPack" className="whitespace-nowrap">
                Select Pack
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="flex flex-col justify-between w-full h-full rounded-lg px-4 py-2">
              <TagInput value={tags} onChange={setTags} />
              <div className="w-full flex gap-3 justify-end items-center">
                <Button
                  className="bg-indigo-900/70 text-slate-50 w-fit px-4 py-2 float-right hover:bg-indigo-900/80 rounded-2xl"
                  onClick={handleClearClick}
                >
                  Clear
                </Button>
                <Button
                  className="bg-indigo-900/70 text-slate-50 w-fit px-4 py-2 float-right hover:bg-indigo-900/80 rounded-2xl"
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="selectPack" className="w-full h-full rounded-lg p-0">
              <AddSourceDropdown />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
