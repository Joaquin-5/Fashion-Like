import React from "react";
import { Button } from '@mui/material'

export const UploadImageButton = ({ setImage, inputFile }) => {
  const handleChange = () => {
    setImage(inputFile.current.files);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => inputFile.current.click()}
      >
        <input type="file" ref={inputFile} onChange={handleChange} hidden />
        Upload File
      </Button>
    </>
  );
};
