import React, { useEffect, useState } from "react";
import { fashionApi } from "../api/fashionApi";
import { Grid } from "@mui/material";
/* import { FormPost } from '../s/cards/FormPost'; */
import { Cards } from "../components/cards/Cards";
import { ModalComponent } from "../components/modal/Modal";

export const Home = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    fashionApi.get("/clothes/get").then((res) => setClothes(res.data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Grid container spacing={2}>
        {clothes.map((c) => (
          <Grid key={c._id} item xs={6} md={3}>
            <Cards
              tileProp={c.title}
              descriptionProp={c.description}
              imageProp={c.image}
              dateProp={c.createdAt}
            />
          </Grid>
        ))}
      </Grid>
      <ModalComponent />
    </div>
  );
};
