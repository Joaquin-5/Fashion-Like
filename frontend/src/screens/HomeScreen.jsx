import { Button, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../components/cards/Cards";
import { startLoadingClothes, startOrderByDate } from "../store/clothes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { posts, filter } = useSelector((state) => state.clothes);
  const { isLoading } = useSelector((state) => state.sideBar);
  const [orderBy, setOrderBy] = useState("asc");

  const handleOrderBy = () => {
    if (orderBy === "asc") {
      setOrderBy("desc");
      dispatch(startOrderByDate("desc"));
    } else {
      setOrderBy("asc");
      dispatch(startOrderByDate("asc"));
    }
  };

  useEffect(() => {
    dispatch(startLoadingClothes());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }

  return (
    <div className="home-container">
      <div
        style={{
          position: "sticky",
          top: "85px",
        }}
      >
        <Button
          endIcon={
            orderBy === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
          }
          sx={{
            display: filter && filter.length === 0 ? "none" : "grid",
            placeSelf: "start",
            gridAutoFlow: "column",
            backgroundColor: "#ffffff",
            boxShadow: "0px 1px 5px -2px rgba(0,0,0,0.46)",
          }}
          onClick={handleOrderBy}
          color="inherit"
        >
          Ordernar
        </Button>
      </div>
      <div className="home-cards" style={{ position: "relative" }}>
        {!filter ? (
          posts.map((c) => (
            <div key={c._id}>
              <Cards {...c} />
            </div>
          ))
        ) : filter.length === 0 ? (
          <h1>No se obtuvieron resultados</h1>
        ) : (
          filter.map((c) => (
            <div key={c._id}>
              <Cards {...c} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
