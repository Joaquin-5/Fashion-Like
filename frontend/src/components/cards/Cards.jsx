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
import Swal from "sweetalert2";
import { FormPost } from "../form/FormPost";
import { fashionApi } from "../../api/fashionApi";
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import { CancelButton } from "../buttons/CancelButton";
import { useDispatch } from "react-redux";
import { startDeletePost } from "../../store/clothes";

const imageMimeType = /image\/(jpg|jpeg)/i;
dayjs.locale("es");

export const Cards = ({
  tileProp,
  descriptionProp,
  imageProp,
  dateProp,
  idProp,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState(tileProp);
  const [description, setDescription] = useState(descriptionProp);
  const [image, setImage] = useState(imageProp);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    setAnchorEl(null);
    dispatch(startDeletePost(id))
  };

  return (
    <>
      <Card sx={{ width: "100%", padding: isEdit ? "0" : "1rem" }}>
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
              title={
                <Typography fontWeight="700" fontSize={"1.2rem"}>
                  {title}
                </Typography>
              }
              subheader={
                <Typography
                  fontSize={".8rem"}
                  sx={{ opacity: 0.8 }}
                  textTransform="capitalize"
                >
                  {dateProp
                    ? dayjs(dateProp).format("dddd MM/YYYY")
                    : "September 14, 2016"}
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
              <Typography variant="body2" color="InfoText">
                {description}
              </Typography>
            </CardContent>{" "}
          </>
        ) : (
          <div style={{ position: "relative", paddingTop: "3.5rem" }}>
            <CancelButton onClick={() => setIsEdit(true)} />
            <FormPost
              idProp={idProp}
              titleProp={title}
              descriptionProp={description}
              imageProp={image}
              setIsEdit={setIsEdit}
            />
          </div>
        )}
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
        <MenuItem onClick={() => handleDelete(idProp)}>
          <Button startIcon={<DeleteIcon />} color="error">
            Eliminar
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};
