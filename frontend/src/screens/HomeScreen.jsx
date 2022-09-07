import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../components/cards/Cards";
import { startLoadingClothes } from "../store/clothes";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { posts, filter } = useSelector((state) => state.clothes);

  useEffect(() => {
    dispatch(startLoadingClothes());
  }, [dispatch]);

  return (
    <div className="home-cards">
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
        <h1>No se obstuvieron resultados</h1>
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
