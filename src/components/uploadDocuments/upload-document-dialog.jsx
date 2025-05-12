import { FileSearch } from "lucide-react";
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

const UploadDocumentDialog = () => {
  return (
    <Dialog>
      <div className="w-full text-center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={
              "w-full h-10 font-semibold text-sm text-muted-foreground hover:bg-gray-100 rounded-full hover:border-gray-300"
            }
          >
            <span className="text-xl">+</span>Upload Document
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent aria-describedby={undefined} className="w-full md:max-w-3xl lg:max-w-4xl h-[600px] flex flex-col py-4 bg-white">
        <DialogHeader className={"flex items-start h-fit p-2"}>
          <DialogTitle className={"text-muted-foreground font-medium text-lg"}>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex flex-col justify-start items-center ">
          <div className="w-full p-8">
            <FileDropper />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
