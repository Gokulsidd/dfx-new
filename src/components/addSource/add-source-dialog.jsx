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
  return (
    <Dialog>
      <div className="w-full text-center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={
              "dark:text-muted-foreground w-full h-10 font-light text-md text-muted-foreground hover:text-slate-50 dark:hover:text-indigo-50 hover:bg-indigo-900/70 rounded-3xl border-gray-300"
            }
          >
            <span className="text-xl">+</span>Add Source
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full md:w-5xl  h-[90%] flex flex-col gap-1 p-2 bg-white">
        <DialogHeader className={"flex items-start h-fit p-2"}>
          <DialogTitle className={"text-muted-foreground font-medium text-lg"}>
            Add Source
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-start flex-1 ">
        <iframe
            src={`http://localhost/DFXDMSLite/dfxsync_demo/ApryseDoc/Index?id=52&repository=LFRepo&readonlyflag=1&newfile=A6vxMjA7.dat&docpreview=1&FileName=VEVTVCAoOCkuZG9jeA==`}
            className="w-full h-full border-none rounded-lg p-0"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
