import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { menuItemsAdminPanel, menuItemsWithoutAuth } from "./menuItemData";
import { useNavigate } from 'react-router-dom'

export const SideBarItems = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {menuItemsWithoutAuth.map((data, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => {navigate(data.link)}}>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
