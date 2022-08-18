import React, { useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import "../index.css";
import { UploadImageButton } from "../components/UploadImageButton";

const opciones = [
  {
    value: "hombre",
    label: "Hombre",
  },
  {
    value: "mujer",
    label: "Mujer",
  },
  {
    value: "otros",
    label: "Otros",
  },
];

export const FormPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [season, setSeason] = useState("");
  const inputFile = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ gender, title, description, season, image });
  };

  return (
    <div>
      <h1>Cree un posteo</h1>
      <form onSubmit={handleSubmit} className="campos">
        <TextField
          id="filled-basic"
          label="Título"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          id="filled-basic"
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <UploadImageButton inputFile={inputFile} setImage={setImage} />
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
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
};
