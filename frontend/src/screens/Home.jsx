import React, { useEffect, useState } from "react";
import { fashionApi } from "../api/fashionApi";
import { Grid } from "@mui/material";
/* import { FormPost } from '../s/cards/FormPost'; */
import { Cards } from "../components/cards/Cards";
import NavBar from "../components/navbar/NavBar";

export const Home = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    fashionApi.get("/clothes/get").then((res) => setClothes(res.data));
  }, []);

  const date = [...clothes].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  return (
    <div className="container">
      <NavBar />
      <div className="cards-container">
        {date.map((c) => (
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
