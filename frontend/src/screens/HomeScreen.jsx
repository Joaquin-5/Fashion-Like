import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../components/cards/Cards";
import { startLoadingClothes, startOrderByDate } from "../store/clothes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { posts, filter } = useSelector((state) => state.clothes);
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

  return (
    <div className="home-cards" style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "30px", top: "200px" }}>
        <Button
          endIcon={
            orderBy === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
          }
          sx={{ display: "grid", placeSelf: "start", gridAutoFlow: "column" }}
          onClick={handleOrderBy}
        >
          Ordernar
        </Button>
      </div>
      {!filter ? (
        posts.map((c) => (
          <div key={c._id}>
            <Cards
              tileProp={c.title}
              descriptionProp={c.description}
              imageProp={c.image}
              dateProp={c.createdAt}
              idProp={c._id}
            />
          </div>
        ))
      ) : filter.length === 0 ? (
        <h1>No se obtuvieron resultados</h1>
      ) : (
        filter.map((c) => (
          <div key={c._id}>
            <Cards
              tileProp={c.title}
              descriptionProp={c.description}
              imageProp={c.image}
              dateProp={c.createdAt}
              idProp={c._id}
            />
          </div>
        ))
      )}
    </div>
  );
};
