import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";
//import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";

const Recipe = () => {
  const [data, setData] = useState("");
  // const [ingredients, setIngredients] = useState([]);
  // const [instructions, setInstructions] = useState([]);
  //const [isFavorite, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState();
  const [notFavorite, setNotFavorite] = useState();
  const [err, setErr] = useState("");
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;
  const token = localStorage.getItem("myKitchenAppToken");
  //console.log(token, "Token here....");
  const fetchRecipe = async () => {
    const recipe = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipe;
  };

  useEffect(() => {
    fetchRecipe()
      .then((response) => {
        setData(response.data);
        //setIngredients(response.data.ingredients);
        //setInstructions(response.data.instructions);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const add = async () => {
    const favRecipe = {
      recipeId: data.id,
      userId: "",
      title: data.title,
      image: data.image,
    };
    try {
      const { recipe } = await axios.post("/api/v1/recipes/list", favRecipe, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setFavorite(favRecipe);
    } catch (err) {
      setErr(err.message);
    }
  };

  const remove = async () => {
    const notFavRecipe = {
      recipeId: data.id,
      // userId: "637430988d29dc672d7a1e70",

      // user: "",
      userId: "",
      user_id: "637430988d29dc672d7a1e70",
    };
    try {
      const { recipe } = await axios.delete(
        `/api/v1/recipes/list/${params.id}`,
        notFavRecipe,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setNotFavorite(notFavRecipe);
    } catch (err) {
      setErr(err.message);
    }
  };
  console.log(favorite);
  console.log(notFavorite);

  const label = { inputProps: { "aria-label": "Checkbox" } };

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
              <IconButton aria-label="delete" size="large">
                <FavoriteBorderIcon fontSize="inherit" onClick={add} />
                <FavoriteIcon
                  fontSize="inherit"
                  color="error"
                  onClick={remove}
                />
              </IconButton>
              {/* <IconButton aria-label="delete" size="large">
                {isFavorite ? (
                  <>
                    <FavoriteIcon
                      fontSize="inherit"
                      color="error"
                      onClick={remove}
                    />
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon fontSize="inherit" onClick={add} />
                  </>
                )}
              </IconButton> */}

              <NutritionModal />
            </div>
          </div>
        </div>
        {/* <div className="ingredientsTable"></div>
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
        </Link> */}
      </div>
    </>
  );
};

export default Recipe;
