import { Delete, FileUp, Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { errorToastObj, getFileIcon } from "@/lib/constants";
import { uploadFiles } from "@/services/api";
import useStore from "@/store/useStore";
import Loader from "./loader";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import Collections from "./collections/collections";

const FileDropper = () => {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const {
    uploadedFiles,
    setUploadedFiles,
    uploadFilesFromDnD,
    setUploadDocumentDialog,
    setSelectedDocumentId,
    selectedCollection,
    newCollectionName,
    showNewCollectionInput,
    saveUploadedFilesToCollection,
    configs,
    user
  } = useStore();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
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
      const uploadResponse = await uploadFilesFromDnD(uploadedFiles);
      console.log("Upload response:", uploadResponse);
      console.log(uploadResponse?.data.DocumentList[0].ID, 'for testing')

      const ids = uploadResponse?.data.ResultID
      const workspaceName = showNewCollectionInput ? newCollectionName : selectedCollection?.workspaceName
      const workspaceId = selectedCollection?.id
      const userId = user?.User.ID
      const workspaceResponse = await saveUploadedFilesToCollection(ids,workspaceId,workspaceName, showNewCollectionInput, userId, selectedCollection)
      console.log(ids, workspaceName, workspaceId, userId)
    } catch (err) {
      toast.error(err.message, errorToastObj);
    } finally {
      setLoading(false);
      setUploadDocumentDialog(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const existingFileNames = uploadedFiles?.map((file) => file.name);

    const hasDuplicate = selectedFiles.some((file) =>
      existingFileNames.includes(file.name)
    );

    if (hasDuplicate) {
      toast.error("Some files are already uploaded!", errorToastObj);
    }

    const uniqueFiles = selectedFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    if (uniqueFiles.length) {
      setUploadedFiles([...uploadedFiles, ...uniqueFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true); // 👈 Set dragging state
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false); // 👈 Reset dragging state
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex justify-around w-full h-full gap-6`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
        className={`w-full ${uploadedFiles.length === 0 ? 'min-h-[380px] h-[400px]' : 'h-full'} bg-[url(/upload_background.png)] bg-cover bg-center flex flex-col items-center justify-center gap-8 border-2 border-dashed rounded-[50px] transition-all duration-200 cursor-pointer relative group
          ${
            isDragging
              ? "bg-blue-50 border-blue-400 text-blue-400 "
              : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 "
          }
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 cursor-pointer group w-full h-full">
          <Button
            variant={"primary"}
            className={`text-muted-foreground bg-white ${isDragging ? 'bg-blue-400 text-white shadow-md' : ' '} group-hover:bg-blue-400 group-hover:text-white group-hover:shadow-md  font-medium rounded-full w-fit h-fit transition-all duration-300`}
          >
            <Upload size={35} className="p-1" />
          </Button>
          <p className="text-lg font-medium text-gray-600  transition-colors duration-200">{configs?.labels.upload_documents.label}</p>
          <p className="text-muted-foreground">
            <span>{configs?.labels.upload_documents.sub_heading}</span>
          </p>
        </div>
        {/* <div className="text-muted-foreground absolute bottom-4">Supported file types: {}</div> */}
      </div>

      {uploadedFiles.length != 0 && (
        <div className="flex flex-col gap-2 w-full h-full">
          <Collections />
          <div className="rounded-[50px] w-full p-6 px-8 h-full flex flex-col justify-between items-center gap-4 relative z-0 bg-gray-100/70">
          <div className={`w-full ${uploadedFiles.length != 0 ? 'h-[150px]' : 'h-300px]'}  bg flex flex-col gap-2  overflow-y-auto pr-2`}>
            {uploadedFiles?.length === 0 ? (
              <div className="flex justify-center items-center text-gray-400 text-sm h-[180px]">
                No files uploaded
              </div>
            ) : (
              uploadedFiles.map((file) => {
                const extension = file.name.split(".").pop();
                return (
                  <div
                    key={file.name}
                    className="flex justify-between h-fit items-center w-full bg-white rounded-md shadow-sm px-4 py-2 border border-gray-200"
                  >
                    <div className="flex  items-center gap-3 text-muted-foreground font-medium text-sm truncate">
                      {getFileIcon(extension, file.name)}
                      <span className="truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:bg-red-100 hover:text-red-600"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          {/* File Actions */}
          <div className="w-full flex justify-end gap-3">
            <Button
              variant="outline"
              className="text-muted-foreground text-sm w-[90px] hover:bg-gray-200 shadow-xs"
              onClick={handleClearClick}
            >
              Clear
            </Button>
            <Button
              disabled={uploadedFiles.length === 0}
              className="bg-gray-900/90 text-sm min-w-[80px] text-white px-4 py-2 rounded-2xl hover:bg-gray-900"
              onClick={handleUploadFile}
            >
              {loading ? <Loader width={4} height={4} /> : "Upload"}
            </Button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default FileDropper;
