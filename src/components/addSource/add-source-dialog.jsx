"use state"

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

const AddSourceDialog = () => {
  const [tags, setTags] = useState([]);

  return (
    <Dialog>
      <div className="w-full text-center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={
              "dark:text-muted-foreground w-full h-10 font-light text-md text-muted-foreground hover:text-slate-50 dark:hover:text-indigo-50 hover:bg-indigo-900/80 rounded-3xl border-gray-300"
            }
          >
            <span className="text-xl">+</span>Add Source
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full md:max-w-2xl lg:max-w-4xl h-[90%] flex flex-col gap-1 p-2 md:p-4 bg-white">
        <DialogHeader className={"flex items-start h-fit p-2"}>
          <DialogTitle className={"text-muted-foreground font-medium text-lg"}>
            Add Source
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-start flex-1 ">
          <Tabs defaultValue="MyDocuments" className="w-full h-full">
            {/* TabsList with horizontal scrolling for mobile */}
            <TabsList className="w-full h-13 flex justify-start overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="Inputs" className="whitespace-nowrap">
                Inputs
              </TabsTrigger>
              <TabsTrigger value="Dropdown" className="whitespace-nowrap">
                Dropdown
              </TabsTrigger>
            </TabsList>

            {/* TabsContent for each tab */}
            <TabsContent
              value="Inputs"
              className="bg-gray-100 w-full h-full rounded-lg p-0"
            >
              <div className="h-full flex flex-col gap-4 justify-around items-center px-4 ">
                <TagInput />
              </div>
            </TabsContent>
            <TabsContent
              value="Dropdown"
              className="bg-gray-100 w-full h-full rounded-lg p-0"
            >
            
            </TabsContent>
            <TabsContent
              value="ClientDocument"
              className="bg-gray-100 w-full h-full rounded-lg p-0"
            >
              <iframe
                src={`http://localhost/DFXDMSLite/dfxsync_demo/ApryseDoc/Index?id=52&repository=LFRepo&readonlyflag=1&newfile=A6vxMjA7.dat&docpreview=1&FileName=VEVTVCAoOCkuZG9jeA==`}
                className="w-full h-full border-none rounded-lg p-0"
              ></iframe>
            </TabsContent>
            <TabsContent
              value="MatterManagement"
              className="bg-gray-100 w-full h-full rounded-lg p-0"
            >
              <iframe
                src={`http://localhost/DFXDMSLite/dfxsync_demo/ApryseDoc/Index?id=52&repository=LFRepo&readonlyflag=1&newfile=A6vxMjA7.dat&docpreview=1&FileName=VEVTVCAoOCkuZG9jeA==`}
                className="w-full h-full border-none rounded-lg p-0"
              ></iframe>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
