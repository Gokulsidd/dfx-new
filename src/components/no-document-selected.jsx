"use client";

import { FileSearch, FileText } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

const NoDocumentSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full "
    >
      <Card className="h-full w-full rounded-2xl border border-dashed border-gray-200 bg-white transition-colors">
        <CardContent className="w-full h-full flex flex-col justify-center items-center gap-4 p-6">
          <div
            className="p-4 bg-white rounded-full"
          >
            <FileSearch size={60} className="text-gray-200" />
            {/* <FileText size={60} className="text-gray-200" /> */}
          </div>
          <p className="text-gray-600 font-medium text-lg text-center">
            Select a document to view details
          </p>
          <p className="text-gray-400 text-sm text-center max-w-md">
            Choose a document to view its contents and metadata.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoDocumentSelected;