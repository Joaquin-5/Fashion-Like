import React from "react";
import { Button, CardMedia } from "@mui/material";

export const UploadImageButton = ({
  inputFile,
  handleImageUpload,
  imagen = false,
  url,
}) => {
  return (
    <>
      {imagen ? (
        <div>
          <input
            type="file"
            ref={inputFile}
            onChange={handleImageUpload}
            hidden
            accept="image/jpg, image/jpeg"
          />
          <CardMedia
            image={url}
            component="img"
            height="194"
            sx={{ objectFit: "contain", zIndex: 0}}
            alt="Paella dish"
            onClick={() => inputFile.current.click()}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};
