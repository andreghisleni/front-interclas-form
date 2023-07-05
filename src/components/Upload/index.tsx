import React, { ReactNode } from "react";

import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

interface UploadProps {
  onUpload: Function;
}

export const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, isFocused } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
      },
      onDropAccepted: (files) => onUpload(files),
    });

  function renderDragMessage(isDragAc: boolean, isDragRe: boolean): ReactNode {
    if (!isDragAc) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRe) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <DropContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
      isFocused={isFocused}
    >
      <input {...getInputProps()} />

      <img src="./upload-icon.svg" alt="Upload Icon" />
      {renderDragMessage(isDragActive, isDragReject)}
    </DropContainer>
  );
};
