import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { ModalComponent } from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { startSearchPost } from "../../store/clothes";
import SideBar from "../sideBar/SideBar";
import { openSideBar } from "../../store/sideBar";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  marginRight: "1rem",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    backgroundColor: "#f1f1f1",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NavBar() {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(startSearchPost(e.target.value));
  };
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={1}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => dispatch(openSideBar())}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer", fontFamily: "Lato, sans-serif", fontSize: "1.45rem" }}
            onClick={() => navigate("/")}
          >
            Fashion Like
          </Typography>
          <div style={{flex: 1}} />
          <Search sx={{marginLeft: 'auto'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          { user?.role === "ROLE_ADMIN" && (<ModalComponent />)}
        </Toolbar>
      </AppBar>
      <SideBar />
    </>
  );
}

export default NavBar;
