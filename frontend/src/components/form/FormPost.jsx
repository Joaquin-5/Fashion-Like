import React, { useEffect, useRef, useState } from "react";

import { TextField, Button } from "@mui/material";
import { UploadImageButton } from "../UploadImageButton";
import {axios} from 'axios';

const imageMimeType = /image\/(jpg|jpeg)/i;

export const FormPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, description, image });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setSelectedFile(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  function add(){
    //console.log('hey')
    var clothes = {
      title: title,
      description: description,
      image:image
    }
    console.log(clothes);
    axios.post('/api/clothes/add', clothes)
    .then(res =>{
      alert(res.data)
    })
    .then(err => {console.log(err)})

  }

  return (
    <>
      <form onSubmit={handleSubmit} className="campos">
        <TextField
          id="filled-basic"
          label="Título"
          variant="outlined"
          htmlFor='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          id="filled-basic"
          label="Descripción"
          variant="outlined"
          htmlFor='description'
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
        <Button type="submit" variant="contained" color="success" onClick={add}>
          Enviar
        </Button>
      </form>
    </>
  );
};
