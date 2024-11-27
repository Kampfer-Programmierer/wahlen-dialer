import React, { useState } from "react";
import { Upload, X, Download } from "lucide-react";
import axios from "axios";

const ImportModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/customers/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const removeFile = () => setFile(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-boxdark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">Import Customers</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Excel Format Instructions */}
        <div className="mb-4 rounded-lg dark:bg-strokedark bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold dark:text-white text-blue-700">
            Excel Import Guidelines
          </h3>
          <div className="space-y-2">
            <p className="text-blue-800 dark:text-white">Required Columns (Exact Names):</p>
            <ul className="list-disc pl-5 text-blue-700 dark:text-white">
              <li>
                <strong>name</strong>: Customer's name
              </li>
              <li>
                <strong>email</strong>: Valid email address
              </li>
              <li>
                <strong>phone</strong>: Contact number (must be unique)
              </li>
              <li>
                <strong>location</strong>: Full address
              </li>
            </ul>
          </div>
        </div>

        {/* Conditionally render drag-and-drop area only if no file is selected */}
        {!file && (
          <div
            className={`rounded-lg border-2 border-dashed p-6 text-center ${
              dragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileInput}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
            <Upload size={48} className="mx-auto mb-4 text-primary" />
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              Drag and drop a file here or{" "}
              <button
                onClick={() => inputRef.current.click()}
                className="text-primary underline"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">Supports: CSV, Excel files</p>
          </div>
        )}

        {file && (
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-medium">File to Upload:</h3>
            <div className="flex items-center justify-between rounded bg-gray-100 p-2">
              <span className="truncate">{file.name}</span>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file}
            className={`rounded px-6 py-2 ${
              file
                ? "bg-primary text-white hover:bg-opacity-90"
                : "cursor-not-allowed bg-primary text-white"
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;