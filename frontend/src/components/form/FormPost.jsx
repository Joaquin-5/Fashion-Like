import React, { useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { UploadImageButton } from "../UploadImageButton";
import { useDispatch } from "react-redux";
import { startAddNewPost, startEditPost } from "../../store/clothes";
import ReactCrop from "react-image-crop";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const imageMimeType = /image\/(jpg|jpeg)/i;
const specialChars = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80vw",
  height: "80vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ src, inputFile, handleImageUpload, textButton, image }) {
  const [open, setOpen] = React.useState(false);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Subir Imágen</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style}}>
          {image && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 style={{ marginBottom: "0" }}>{image.name}</h2>
              <div style={{ height: "auto", width: "80%" }}>
                <ReactCrop
                  crop={crop}
                  onChange={(crop, percentCrop) => setCrop(crop)}
                  onComplete={console.log}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={src}
                    alt="preview"
                  />
                </ReactCrop>
              </div>
            </div>
          )}
          <UploadImageButton
            inputFile={inputFile}
            handleImageUpload={handleImageUpload}
            textButton={image ? "Cambiar imagen" : "Subir imagen"}
          />
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

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
        <ChildModal
          src={selectedFile}
          inputFile={inputFile}
          handleImageUpload={handleImageUpload}
          textButton={image ? "Cambiar imagen" : "Subir imagen"}
          image={image}
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
          {editProp ? "Postear" : "Editar"}
        </Button>
      </form>
    </>
  );
};
