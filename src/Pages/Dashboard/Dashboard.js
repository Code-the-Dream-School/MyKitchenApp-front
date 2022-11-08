import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";

import Button from "@mui/material/Button";
export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const url = "/api/v1/recipes";
  //const params = { params: { params: "Dashboard" } };
  const fetchRecipes = async () => {
    const recipes = await axios.get(url);

    return recipes;
  };

  React.useEffect(() => {
    fetchRecipes()
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log({ favoriteRecipes });
  return (
    <>
      <h1>Welcome user!</h1>

      <h1>Discover recipes for the day</h1>
      <Button
        variant="outlined"
        sx={{
          mt: 3,
          mb: 2,
          ml: 1,
          display: "inline",
          height: "50px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Find new recipe
      </Button>

      <div>
        Recipes
        {data || data.length ? (
          <div className="trending">
            {data.map((recipe) => {
              return (
                <ReusableCard
                  key={recipe.id}
                  title={recipe.title}
                  data={recipe}
                  image={recipe.image}
                  updateFavorite={setFavoriteRecipes}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
