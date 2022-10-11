/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import {
  Box,
  Button,
  Divider, Modal,
  Select,
  Tooltip,
  Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { actionLike, startDeletePost } from "../../store/clothes";
import { CancelButton } from "../buttons/CancelButton";
import { FormPost } from "../form/FormPost";
import "./card.style.css";

// eslint-disable-next-line no-unused-vars
import { Numeric } from "../typeStat/Numeric";
import { BarStats } from "../typeStat/Bar";
import { PieStats } from "../typeStat/Pie";
dayjs.locale("es");

export const Cards = ({
  _id,
  title,
  description,
  image,
  createdAt,
  neutrals,
  likes,
  dislikes,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [openStats, setOpenStats] = useState(false);
  const [stat, setStat] = useState('numeric');
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

  const isLogged = (action, clothesId) => {
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
    dispatch(actionLike(action, clothesId));
  };

  const dismissChanges = () => {
    return Swal.fire({
      icon: "warning",
      title: "Descartar cambios",
      text: "¿Estás seguro de que quieres descartar los cambios?",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsEdit(true);
      }
    });
  };

  const handleStatChange = (event) => {
    setStat(event.target.value);
  };

  return (
    <>
      <Card sx={{ width: "100%", padding: isEdit ? "0" : "1rem" }}>
        {isEdit ? (
          <>
            <CardHeader
              action={
                user?.role === "ROLE_ADMIN" || user?.role === "ROLE_OWNER" ? (
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
                      <IconButton onClick={() => isLogged("like", _id)}>
                        {user && likes.includes(user.id) ? (
                          <ThumbUpIcon color="success" />
                        ) : (
                          <ThumbUpAltOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Neutral">
                      <IconButton onClick={() => isLogged("neutral", _id)}>
                        {user && neutrals.includes(user.id) ? (
                          <ThumbsUpDownIcon color="warning" />
                        ) : (
                          <ThumbsUpDownOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Dislike">
                      <IconButton onClick={() => isLogged("dislike", _id)}>
                        {user && dislikes.includes(user.id) ? (
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
                  {title}
                </Typography>
              }
              subheader={
                <Typography
                  fontSize={".8rem"}
                  sx={{ opacity: 0.8 }}
                  textTransform="capitalize"
                >
                  {createdAt
                    ? dayjs(createdAt).format("dddd - DD/MM/YYYY")
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
            {description && (
              <Divider
                variant="middle"
                sx={{ borderBottomWidth: 2, marginTop: "1.5em" }}
              />
            )}
            <CardContent>
              <Typography
                variant="body2"
                color="InfoText"
                sx={{ fontSize: "1em" }}
              >
                {description}
              </Typography>
            </CardContent>{" "}
          </>
        ) : (
          <div style={{ position: "relative", paddingTop: "3.5rem" }}>
            <CancelButton onClick={dismissChanges} />
            <FormPost
              idProp={_id}
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
        <MenuItem>
          <Button
            startIcon={<QueryStatsIcon />}
            color="primary"
            onClick={() => setOpenStats(true)}
          >
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
        <MenuItem onClick={() => handleDelete(_id)}>
          <Button startIcon={<DeleteIcon />} color="error">
            Eliminar
          </Button>
        </MenuItem>
      </Menu>
      <Modal
        open={openStats}
        onClose={() => setOpenStats(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            minWidth: {xs: '90%', sm: 400},
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <CancelButton
            onClick={() => setOpenStats(false)}
            style={{
              top: "-17px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "11px 14px",
            }}
          />
          <Box display={'flex'} alignItems='center' gap={3}>
            <h2 style={{ margin: 0 }}>Estadisticas del post </h2>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stat}
              onChange={handleStatChange}
            >
              <MenuItem value={'numeric'}>Numérico</MenuItem>
              <MenuItem value={'bar'}>Barra</MenuItem>
              <MenuItem value={'pay'}>Torta</MenuItem>
            </Select>
          </Box>
          <Divider sx={{ borderBottomWidth: 2, my: "1rem" }} />
          {stat === 'numeric' && <Numeric likes={likes} neutrals={neutrals} dislikes={dislikes}/>}
          {stat === 'bar' && <BarStats likes={likes} neutrals={neutrals} dislikes={dislikes}/>}
          {stat === 'pay' && <PieStats likes={likes} neutrals={neutrals} dislikes={dislikes}/>}
        </Box>
      </Modal>
    </>
  );
};
