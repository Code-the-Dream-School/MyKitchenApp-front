import React, { useState, useEffect } from "react";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Link } from "react-router-dom";
import "./Favorite.css";

export default function Favorite({ currentUser }) {
  const [favorites, setFavorites] = useState([]);

  const urlFavorites = "/api/v1/recipes/list";

  const token = localStorage.getItem("myKitchenAppToken");

  const getFavorites = () => {
    axios
      .get(urlFavorites, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const favoriteRecipes = response.data;
        setFavorites(favoriteRecipes);
        console.log(favoriteRecipes);
      });
  };

  useEffect(() => {
    getFavorites();
  }, [token]);

  return (
    <>
      <div>
        <h1 className="favoriteHead">Favorite recipes</h1>
      </div>
      <div>
        {favorites || favorites.length ? (
          <div className="favorites">
            {favorites.map((recipe) => {
              return (
                <Link to={"/recipe/" + recipe.recipeId} key={recipe.recipeId}>
                  <ReusableCard
                    key={recipe.recipeId}
                    title={recipe.title}
                    data={recipe}
                    image={recipe.image}
                  />
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
