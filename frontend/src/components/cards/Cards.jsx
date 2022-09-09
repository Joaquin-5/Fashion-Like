/* eslint-disable react/prop-types */
import React, { useState } from "react";
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
import { Button, Tooltip, Typography } from "@mui/material";
import { FormPost } from "../form/FormPost";
import dayjs from "dayjs";
import { CancelButton } from "../buttons/CancelButton";
import { useDispatch, useSelector } from "react-redux";
import { startDeletePost } from "../../store/clothes";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

// eslint-disable-next-line no-unused-vars
import { es } from "dayjs/locale/es"; // No quitar
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
  const [like, setLike] = useState({
    like: false,
    neutral: false,
    dislike: false,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    setAnchorEl(null);
    dispatch(startDeletePost(id));
  };

  const isLogged = (action) => {
    if (user === null) {
      return Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción",
        text: "Por favor inicia sesión",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
    }
    if (action === "like") {
      setLike({
        like: true,
        neutral: false,
        dislike: false,
      });
      if (like.like) {
        setLike({ ...like, like: false });
      }
    }
    if (action === "neutral") {
      setLike({
        like: false,
        neutral: true,
        dislike: false,
      });
      if (like.neutral) {
        setLike({ ...like, neutral: false });
      }
    }
    if (action === "dislike") {
      setLike({
        like: false,
        neutral: false,
        dislike: true,
      });
      if (like.dislike) {
        setLike({ ...like, dislike: false });
      }
    }
  };

  return (
    <>
      <Card sx={{ width: "100%", padding: isEdit ? "0" : "1rem" }}>
        {isEdit ? (
          <>
            <CardHeader
              action={
                user?.role === "ROLE_ADMIN" ? (
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
                  // Botones like, dislike, neutral
                  <>
                    <Tooltip title="Like">
                      <IconButton onClick={() => isLogged("like")}>
                        {like.like ? (
                          <ThumbUpIcon color="success" />
                        ) : (
                          <ThumbUpAltOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Neutral">
                      <IconButton onClick={() => isLogged("neutral")}>
                        {like.neutral ? (
                          <ThumbsUpDownIcon color="warning" />
                        ) : (
                          <ThumbsUpDownOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Dislike">
                      <IconButton onClick={() => isLogged("dislike")}>
                        {like.dislike ? (
                          <ThumbDownIcon color="error" />
                        ) : (
                          <ThumbDownAltOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </>
                )
              }
              title={
                <Typography fontWeight="700" fontSize={"1.2rem"}>
                  {tileProp}
                </Typography>
              }
              subheader={
                <Typography
                  fontSize={".8rem"}
                  sx={{ opacity: 0.8 }}
                  textTransform="capitalize"
                >
                  {dateProp
                    ? dayjs(dateProp).format("dddd - DD/MM/YYYY")
                    : "September 14, 2016"}
                </Typography>
              }
            />
            <CardMedia
              component="img"
              height="194"
              image={imageProp}
              sx={{ objectFit: "contain" }}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="InfoText">
                {descriptionProp}
              </Typography>
            </CardContent>{" "}
          </>
        ) : (
          <div style={{ position: "relative", paddingTop: "3.5rem" }}>
            <CancelButton onClick={() => setIsEdit(true)} />
            <FormPost
              idProp={idProp}
              titleProp={tileProp}
              descriptionProp={descriptionProp}
              imageProp={imageProp}
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
        <MenuItem>
          <Button startIcon={<QueryStatsIcon />} color="primary">
            Estadisticas del post
          </Button>
        </MenuItem>
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
