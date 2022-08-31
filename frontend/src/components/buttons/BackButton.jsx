import { Button, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = ({ to }) => {
  const navigate = useNavigate();
  return (
    <IconButton sx={{ alignSelf: "start" }} onClick={() => navigate(to)}>
      <ArrowBackIcon />
    </IconButton>
  );
};
