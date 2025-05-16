import { Delete, FileUp, Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { getFileIcon } from "@/lib/constants";
import { uploadFiles } from "@/services/api";
import useStore from "@/store/useStore";

const FileDropper = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { uploadedFiles, setUploadedFiles } = useStore();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setUploadedFiles([...uploadedFiles, ...droppedFiles]);
    }
  };

  const handleRemoveFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
  };

  const handleClearClick = () => {
    setUploadedFiles([]);
  };

  const handleUploadFile = async () => {
    try {
      setLoading(true);
      const res = await uploadFiles(uploadedFiles);
      console.log("Upload response:", res);
      setUploadedFiles([]);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length) {
      setUploadedFiles([...uploadedFiles, ...selectedFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="flex flex-col justify-between w-full h-full gap-6 ">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileSelect}
        className="w-full h-[200px] flex flex-col items-center justify-center gap-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl transition-shadow duration-200 hover:bg-gray-100/50 cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm">Drag & drop files here</p>
          <p className="text-gray-500 text-xs mt-1">or click to browse</p>
        </div>
      </div>

      {uploadedFiles?.length > 0 && (
        <div className="flex flex-col items-start justify-center gap-8 w-full">
          <div className="bg-gray-100 rounded-xl w-full p-4 max-h-[200px] h-[400px]  overflow-y-hidden overflow-y-scroll flex flex-col items-center gap-2">
            {uploadedFiles?.map((file) => {
              const extension = file.name.split(".").pop();
              return (
                <div
                  key={file.name}
                  className="flex w-[650px] justify-between px-4 py-1 gap-2 bg-white rounded-md"
                >
                  <div className="flex items-center gap-3 text-muted-foreground font-medium whitespace-nowrap p-4 py-2">
                    {getFileIcon(extension, file.name)}
                    {file.name}
                  </div>
                  <Button
                    variant={"ghost"}
                    className={
                      "text-gray-600/70 hover:bg-red-100 hover:text-red-600/70 h-full group"
                    }
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    <Trash2
                      size={20}
                      className="text-red-600/70 group-hover:text-red-600/70"
                    />
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="w-full flex gap-3 justify-end items-center">
            <Button
              variant={"outline"}
              className="text-muted-foreground text-sm w-[90px] hover:bg-gray-200"
              onClick={handleClearClick}
            >
              Clear
            </Button>
            <Button
              disabled={uploadedFiles?.length === 0}
              className="bg-gray-900/90 text-sm text-slate-50 w-fit min-w-[100px] px-4 py-2 float-right hover:bg-gray-900 rounded-2xl"
              // onClick={handleSearchClick}
            >
              {loading ? <Loader width={4} height={4} /> : "Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropper;
