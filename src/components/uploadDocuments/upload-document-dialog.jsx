import { FileSearch, UploadIcon } from "lucide-react";
import FileDropper from "../file-dropper";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
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

const UploadDocumentDialog = () => {
  const { isCollapsed, setUploadDocumentDialog, isUploadDocumentDialogOpen } =
    useStore();

  return (
    <Dialog
      open={isUploadDocumentDialogOpen}
      onOpenChange={setUploadDocumentDialog}
    >
      <div className="w-full text-center">
        <DialogTrigger asChild>
          {isCollapsed ? (
            <Tooltip>
              <Button
                onClick={() => setUploadDocumentDialog(true)}
                className="w-full h-10 font-semibold text-sm text-muted-foreground bg-white custom-shadow hover:scale-105 hover:bg-white rounded-full"
              >
                Upload Document
              </Button>
            </Tooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDocumentDialog(true)}
                    className="w-full h-10 font-semibold text-sm text-muted-foreground hover:bg-gray-100 rounded-full hover:border-gray-300"
                  >
                    <span className="text-xl">+</span> Upload Document
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Upload Document</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogTrigger>
      </div>

      <DialogContent className="w-full md:max-w-3xl lg:max-w-4xl h-[600px] flex flex-col py-4 bg-white rounded-4xl">
        <DialogHeader className="flex items-start h-fit p-2">
          <DialogTitle className="text-muted-foreground font-medium text-lg">
            {/* Optional: Title text here */}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-full flex flex-col justify-start items-center">
          <div className="w-full h-full p-8">
            <FileDropper />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
