import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const menuItemsAdminPanel = [
  {
    text: "Inicio",
    icon: <HomeIcon color="info" />,
    link: "/",
  },
  {
    text: "Gestionar usuarios",
    icon: <ManageAccountsIcon color="info" />,
    link: "/admin/manageUsers",
  },
];
export const menuItemsWithoutAuth = [
  {
    text: "Iniciar Sesión",
    icon: <LoginIcon />,
    link: "/auth/login",
  },
  {
    text: "Registrarse",
    icon: <PersonAddIcon />,
    link: "/auth/register",
  },
];
