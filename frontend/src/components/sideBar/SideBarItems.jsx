import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useEffect } from "react";
import { menuItemsAdminPanel, menuItemsWithoutAuth } from "./menuItemData";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { startLogOut } from "../../store/auth/thunk";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { textAlign } from "@mui/system";

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
                <AccountCircleIcon color="success"/>
              </ListItemIcon>
              <ListItemText primary={user.username} primaryTypographyProps={{fontSize: "1.2rem", fontWeight: "700"}}/>
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
                      <ListItemButton>
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
              <ListItemButton onClick={() => dispatch(startLogOut())} >
                <ListItemIcon>
                  <LogoutIcon color="error"/>
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
