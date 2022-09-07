import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Cards } from "../components/cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingClothes } from "../store/clothes";

export const AdminPosts = () => {
  const dispatch = useDispatch();
  const { posts, filter } = useSelector((state) => state.clothes);

  useEffect(() => {
    dispatch(startLoadingClothes());
  }, [dispatch]);

  return (
    <>
      {/* <NavBar /> */}
      <div className="cards-container">
        {!filter
          ? posts.map((c) => (
              <Grid key={c._id} item xs={6} md={3} justifyContent="center">
                <Cards
                  tileProp={c.title}
                  descriptionProp={c.description}
                  imageProp={c.image}
                  dateProp={c.createdAt}
                  idProp={c._id}
                />
              </Grid>
            ))
          : filter.map((c) => (
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
    </>
  );
};
