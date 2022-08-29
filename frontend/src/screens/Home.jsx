import React, { useEffect } from "react";
import { Grid } from "@mui/material";
/* import { FormPost } from '../s/cards/FormPost'; */
import { Cards } from "../components/cards/Cards";
import NavBar from "../components/navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingClothes } from "../store/clothes";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.clothes);

  useEffect(() => {
    dispatch(startLoadingClothes());
  }, [dispatch]);

  return (
    <div className="container">
      <NavBar />
      <div className="cards-container">
        {posts.map((c) => (
          <Grid key={c._id} item xs={6} md={3} justifyContent="center">
            <Cards
              tileProp={c.title}
              descriptionProp={c.description}
              imageProp={c.image}
              dateProp={c.createdAt}
              idProp={c._id}
            />
          </Grid>
        ))}
      </div>
    </div>
  );
};
