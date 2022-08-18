import React from "react";
import { Button } from "@mui/material";

export const UploadImageButton = ({
  inputFile,
  handleImageUpload,
}) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => inputFile.current.click()}
      >
        <input
          type="file"
          ref={inputFile}
          onChange={handleImageUpload}
          hidden
          accept="image/jpg, image/jpeg"
        />
        Upload File
      </Button>
    </>
  );
};
