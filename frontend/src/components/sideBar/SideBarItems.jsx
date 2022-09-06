import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { menuItemsAdminPanel, menuItemsWithoutAuth } from "./menuItemData";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
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
            <ListItem disablePadding>
              <ListItemButton onClick={() => dispatch(startLogOut())}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
          {user.role === "ROLE_ADMIN" && (
            <>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText primary="Admin Panel" />
                </ListItem>
                {menuItemsAdminPanel.map((data, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{data.icon}</ListItemIcon>
                      <ListItemText primary={data.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
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

{
  /* {["Ingresar", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */
}
