import React from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DescriptionIcon from '@mui/icons-material/Description';
import LoginIcon from '@mui/icons-material/Login';

export const menuItemsAdminPanel = [
  {
    text: "Gestionar usuarios",
    icon: <ManageAccountsIcon color="info"/>,
  },
  {
    text: "Gestionar Posteos",
    icon: <DescriptionIcon color="info"/>,
  },
];
export const menuItemsWithoutAuth = [
  {
    text: "Iniciar Sesión",
    icon: <LoginIcon />,
    link: '/auth/login',
  },
];
