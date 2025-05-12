import { Delete, FileUp, Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { getFileIcon } from "@/lib/constants";
import { uploadFiles } from "@/services/api";

const FileDropper = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleUploadFile = async () => {
    const res = await uploadFiles(files)
    console.log(res, 'this is upload api response')
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 my-10">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileSelect}
        className="w-full h-full flex flex-col items-center justify-center gap-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl transition-shadow duration-200 hover:bg-gray-100/50 cursor-pointer"
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm">Drag & drop files here</p>
          <p className="text-gray-500 text-xs mt-1">or click to browse</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col items-start justify-center gap-3 ">
          <div className="bg-gray-100/50 rounded-xl w-[700px] p-4 h-[200px]  overflow-y-hidden hover:overflow-y-scroll flex flex-col gap-2">
            {files.map((file) => {
              const extension = file.name.split(".").pop();
              return (
                <div key={file.name} className="flex w-[650px] justify-between px-4 py-1 gap-2 bg-white rounded-md">
                  <div className="flex items-center gap-3 text-muted-foreground font-medium whitespace-nowrap p-4 py-2">
                    {getFileIcon(extension, file.name)}
                    {file.name}
                  </div>
                  <Button
                    variant={"ghost"}
                    className={"text-gray-600/70 hover:bg-red-100 hover:text-red-600/70 h-full group"}
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    <Trash2 size={20} className="text-red-600/70 group-hover:text-red-600/70" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="w-full">
            <Button
              variant={"primary"}
              className={
                "hover:text-green-600/70  w-[120px] border-none rounded-xl text-muted-foreground hover:bg-green-100 float-right"
              }
              onClick={handleUploadFile}
            >
              <FileUp size={20} className="text-green-600/70" />
              Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropper;
