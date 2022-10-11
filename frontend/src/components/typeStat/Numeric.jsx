import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";

export const Numeric = ({ neutrals, likes, dislikes }) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ThumbUpIcon color="success" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={"Likes: " + likes.length}
          primaryTypographyProps={{ fontSize: "19px" }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ThumbsUpDownIcon color="warning" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={"Neutrals: " + neutrals.length}
          primaryTypographyProps={{ fontSize: "19px" }}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ThumbDownIcon color="error" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={"Dislikes: " + dislikes.length}
          primaryTypographyProps={{ fontSize: "19px" }}
        />
      </ListItem>
    </>
  );
};
