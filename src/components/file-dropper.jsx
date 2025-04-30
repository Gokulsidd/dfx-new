import { Delete, FileUp, Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

const FileDropper = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleUploadFile = async () => {
    // api here
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm">Drag & drop a file here</p>
          <p className="text-gray-500 text-xs mt-1">or click to browse</p>
        </div>
      </div>

      {file && (
        <div className="flex gap-3 w-full items-center justify-center">
          <div className="text-center p-8 py-2 bg-gray-100/50 shadow-md rounded-xl text-gray-700 font-medium">
            {file.name}
          </div>
          <Button
            variant={"ghost"}
            className={"text-blue-600/70 hover:bg-blue-100 h-full"}
            onClick={handleUploadFile}
          >
            <Upload className="text-blue-600/70" />
          </Button>
          <Button
            variant={"ghost"}
            className={"text-red-600/70 hover:bg-red-100 h-full"}
            onClick={handleRemoveFile}
          >
            <Trash2 className="text-red-600/70" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileDropper;
