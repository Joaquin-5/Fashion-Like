import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { menuItemsAdminPanel, menuItemsWithoutAuth } from "./menuItemData";
import { startLogOut } from "../../store/auth/thunk";
import { useNavigate } from "react-router-dom";

export const SideBarItems = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user);

  return (
    <Box sx={{ width: 250 }} role="presentation">
      {user ? (
        <>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              />
            </ListItem>
            {user.role === "ROLE_ADMIN" && (
              <>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText primary="Admin Panel" />
                  </ListItem>
                  {menuItemsAdminPanel.map((data, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => navigate(data.link)}>
                        <ListItemIcon>{data.icon}</ListItemIcon>
                        <ListItemText primary={data.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => dispatch(startLogOut())}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          {menuItemsWithoutAuth.map((data, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(data.link);
                }}
              >
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};