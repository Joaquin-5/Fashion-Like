import React, { useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { UploadImageButton } from "../UploadImageButton";
import { useDispatch } from "react-redux";
import { startAddNewPost, startEditPost } from "../../store/clothes";

const imageMimeType = /image\/(jpg|jpeg)/i;
const specialChars = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";

export const FormPost = ({
  idProp,
  titleProp = "",
  descriptionProp = "",
  imageProp,
  editProp,
  setIsEdit,
  handleModalProp,
}) => {
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [image, setImage] = useState(imageProp || null);
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(imageProp || null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  console.log({descriptionProp, description});

  const validacion = (title) => {
    if (title.length < 2 || title.length > 30) {
      setError(true);
      setErrorMessage(
        "El título debe tener como mínimo 2 y un máximo de 30 caracteres"
      );
      return true;
    }
    if (title.match(specialChars) == null) {
      setError(true);
      setErrorMessage("No se pueden usar numeros ni caracteres especiales");
      return true;
    }
    setError(false);
    setErrorMessage("");
    return false;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    if (!editProp) {
      if (title.length < 2 || title.length > 30) {
        return;
      }
      // Editar
      dispatch(startEditPost({ id, title, description, image }));
      setIsEdit(true);
      return;
    }
    // Crear
    dispatch(startAddNewPost({ title, description, image }));
    handleModalProp();
  };

  const handleTitleError = (e) => {
    setTitle(e.target.value);
    validacion(e.target.value);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, idProp)} className="campos">
        <TextField
          id="filled-basic"
          label="Título"
          variant="outlined"
          value={title}
          onChange={handleTitleError}
          required
          onBlur={(e) => {
            validacion(e.target.value);
          }}
          error={error}
          helperText={error ? errorMessage : null}
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
          textButton={image ? "Cambiar imagen" : "Subir imagen"}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={
            error || title.length < 2 || title.length > 30 || !image
              ? true
              : false
          }
        >
          {editProp ? "Postear" : "Guardar"}
        </Button>
      </form>
    </>
  );
};
