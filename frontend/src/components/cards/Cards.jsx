import React, { useRef, useState } from "react";
import "./card.style.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Swal from 'sweetalert2';
import { FormPost } from "../form/FormPost";

const imageMimeType = /image\/(jpg|jpeg)/i;

export const Cards = ({tileProp, descriptionProp, imageProp, dateProp}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState(tileProp);
  const [description, setDescription] = useState(descriptionProp);
  const [image, setImage] = useState(imageProp);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "¿Estás seguro que querés eliminar esta publicación?",
      text: "No se va a poder recuperar esta publicación!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La publicación ha sido eliminada.", "success");
      }
    });
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, padding: isEdit ? "0" : "1rem"}}>
      {isEdit ? (
      <>
      <CardHeader
          action={
            isEdit ? (
              <IconButton
                id="basic-button"
                aria-label="settings"
                onClick={handleClick}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSubmit} color="success">
                <CheckBoxIcon />
              </IconButton>
            )
          }
          title={<Typography fontWeight="700" fontSize={"1.2rem"}>{title}</Typography>}
          subheader={
            <Typography
              fontSize={".8rem"}
              sx={{ opacity: 0.8  }}
            >
              {dateProp ? new Date(dateProp).toDateString() : 'September 14, 2016'}
            </Typography>
          }
        />
        
          <CardMedia
            component="img"
            height="194"
            image={image}
            sx={{ objectFit: "contain" }}
            alt="Paella dish"
          /> 
        <CardContent>
          <Typography variant="body2" color="InfoText">{description}</Typography>
        </CardContent> </>) : <FormPost titleProp={title} descriptionProp={description} imageProp={image} setIsEdit={setIsEdit}/>} 
      </Card>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button
            startIcon={<EditIcon />}
            color="info"
            onClick={() => setIsEdit(false)}
          >
            Editar
          </Button>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
        >
          <Button startIcon={<DeleteIcon />} color="error">
            Eliminar
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};