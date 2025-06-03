// components/sources/sources-dialog.jsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AddSource from "../addSource/add-source";
import UploadInFolder from "../folder/folder";
import MatterManagement from "../MatterManagement/MatterManagement";
import Collections from "../collections/collections";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import FileDropper from "../file-dropper";

const SourcesDialog = () => {
  const [isSourcesDialogOpen, setIsSourcesDialogOpen] = useState(false);

  return (
    <Dialog open={isSourcesDialogOpen} onOpenChange={setIsSourcesDialogOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    onClick={() => setIsSourcesDialogOpen(true)}
                    className="w-full h-10 font-semibold text-sm text-muted-foreground hover:bg-gray-100 rounded-full hover:border-gray-300"
                  >
                    <span className="text-xl">+</span> Add Source
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Manage Sources</TooltipContent>
              </Tooltip>
            </TooltipProvider>
      </DialogTrigger>

      <DialogContent className="w-full md:max-w-3xl lg:max-w-6xl h-[700px] p-4 bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-muted-foreground hidden">
            Source Manager
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="add" className="w-full h-full flex flex-col items-start">
          <TabsList className="flex justify-between w-[60%] h-10 gap-2 p-1 bg-gray-100 rounded-xl shadow-inner">
            <TabsTrigger
              value="upload"
              className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black transition-all duration-200"
            >
              Upload Document
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black transition-all duration-200"
            >
              Add Source
            </TabsTrigger>
            <TabsTrigger
              value="folder"
              className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black transition-all duration-200"
            >
              Folder
            </TabsTrigger>
            <TabsTrigger
              value="matter"
              className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black transition-all duration-200"
            >
              Matter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="h-full w-full overflow-auto">
            <FileDropper  />
          </TabsContent>
          <TabsContent value="add" className="h-full w-full overflow-auto">
            <AddSource />
          </TabsContent>
          <TabsContent value="folder" className="h-full overflow-auto">
            <Collections />
          </TabsContent>
          <TabsContent value="matter" className="h-full overflow-auto">
            <MatterManagement />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SourcesDialog;
