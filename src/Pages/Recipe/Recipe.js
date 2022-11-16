import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";

const Recipe = () => {
  const [data, setData] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;
  const token = localStorage.getItem("myKitchenAppToken");
  const fetchRecipe = async () => {
    const recipes = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipes;
  };

  useEffect(() => {
    fetchRecipe()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="pageWrapper">
        <div className="topContainer">
          <img alt={data.title} src={data.image} />
          <div className="recipeInfo">
            <h1>{data.title}</h1>
            <ul>
              <li>
                <ImSpoonKnife className="icon" />
                {data.servings} servings
              </li>
              <li>
                <HiClock className="icon" />
                {data.readyInMinutes} mins
              </li>
            </ul>
            <div>
              <Button variant="contained" color="error">
                {isSaved ? (
                  <>
                    <FaHeartBroken /> Remove
                  </>
                ) : (
                  <>
                    <FaHeart /> Favorite this
                  </>
                )}
              </Button>
              <NutritionModal />
            </div>
          </div>
        </div>
        <div className="ingredientsTable"></div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        <h2>Instructions</h2>
        <ul>
          {instructions.map((i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        <h2>Summary</h2>
        <Typography>{data.summary}</Typography>
        <h2>Source URL</h2>
        <Link href={data.sourceUrl} underline="none">
          {data.sourceUrl}
        </Link>
      </div>
    </>
  );
};

export default Recipe;
