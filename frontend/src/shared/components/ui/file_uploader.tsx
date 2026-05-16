"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  isMulti?: boolean;
  onFilesSelected?: (files: File[]) => void;
}

export function FileUploader({
  isMulti = false,
  onFilesSelected,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      onFilesSelected?.(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: isMulti,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />

        <p className="text-gray-700 font-medium">
          {isDragActive
            ? "Solte os arquivos aqui..."
            : "Arraste arquivos ou clique para selecionar"}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          PNG, JPG, WEBP...
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 bg-gray-50"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-32 object-cover rounded"
              />

              <p className="text-sm mt-2 truncate">
                {file.name}
              </p>

              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}