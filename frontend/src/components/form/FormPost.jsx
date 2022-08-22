import React, { useEffect, useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { UploadImageButton } from "../UploadImageButton";

const imageMimeType = /image\/(jpg|jpeg)/i;

export const FormPost = ({
  titleProp = "",
  descriptionProp = "",
  imageProp,
  onSubmit
}) => {
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [image, setImage] = useState(imageProp || null);
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(imageProp || null);
  const [error, setError] = useState(false);

  const validacion = () => {
    setError(false);
    if (title.length < 2) {
      setError(true);
      return true;
    }
    return false;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(file);
    setSelectedFile(URL.createObjectURL(file))
  };

  return (
    <>
      <form onSubmit={onSubmit} className="campos">
        <TextField
          id="filled-basic"
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          onBlur={validacion}
          error={error}
          helperText={
            error
              ? "El título debe tener como mínimo dos caracteres"
              : null
          }
        />
        <TextField
          id="standard-multiline-flexible"
          multiline
          maxRows={4}
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {image && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginBottom: "0" }}>{image.name}</h2>
            <div style={{ height: "100px", width: "100px" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={selectedFile}
                alt="preview"
              />
            </div>
          </div>
        )}

        <UploadImageButton
          inputFile={inputFile}
          handleImageUpload={handleImageUpload}
        />
        {/* <TextField
          id="filled-basic"
          label="Género"
          variant="outlined"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          helperText="Elija el género"
        >
          {opciones.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Temporada"
          variant="outlined"
          // select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          helperText="Elija la temporada"
        /> */}
        <Button type="submit" variant="contained" color="success" disabled={title.length < 2 ? true : false}>
          Enviar
        </Button>
      </form>
    </>
  );
};