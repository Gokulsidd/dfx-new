import { Search, Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddDocumentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline" className={'md:w-sm  dark:text-muted-foreground  font-light text-lg hover:text-indigo-50 dark:hover:text-indigo-50 hover:bg-indigo-500/80'}>
          <span className="text-xl">+</span>Add
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-3xl h-96 p-4 grid grid-cols-1 gap-1">
        <DialogHeader className="flex flex-col gap-2 justify-start items-center">
          <DialogTitle className={'text-muted-foreground font-medium text-lg'}>Add document</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4 p-10">
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Document Id or Pack name" />
            <Button
              className="dark:text-muted-foreground rounded-2xl h-12 font-light text-lg hover:text-indigo-50 hover:bg-indigo-500/80 shadow-xs group"
              variant={"outline"}
              size={"xl"}
            >
              <Search className="group-hover:text-slate-100 h-8 w-5 text-muted-foreground" />
            </Button>
          </div>
          <span className="text-lg text-muted-foreground font-medium text-center">
            or
          </span>
          <div className="w-full flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl shadow-xs">
            <Label className="w-12 h-12 p-3 rounded-2xl bg-muted hover:bg-gray-200  cursor-pointer text-muted-foreground hover:text-indigo-500/80 dark:bg-transparent dark:text-muted-foreground dark:hover:bg-indigo-300 dark:hover:text-indigo-500/80  ">
              <Upload className="w-full h-full " />
              <Input type="file" className="hidden" />
            </Label>
            <span className="text-lg text-muted-foreground font-light">
              Upload Document Pack
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
