import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";
import { MdOutlineCircle } from "react-icons/md";
import DOMPurify from "dompurify";

const Recipe = () => {
  const [data, setData] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [isFav, setIsFav] = useState("");
  const [err, setErr] = useState("");
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;
  const token = localStorage.getItem("myKitchenAppToken");

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
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
        setIsFav(response.data.isFavorite);
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
      const { recipe } = await axios.post("/api/v1/recipes/list/", favRecipe, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setFavorite(favRecipe);
      setIsFav(true);
    } catch (err) {
      setErr(err.message);
    }
  };

  const remove = async () => {
    try {
      const { recipe } = await axios.delete(
        `/api/v1/recipes/${params.id}`,

        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setIsFav(false);
    } catch (err) {
      setErr(err.message);
    }
  };

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data.summary),
  });

  //Find Spoonacular score from data.summary
  let text = data.summary;

  function findWordAndNeighbours(needle, haystack) {
    if (!needle || !haystack) {
      return false;
    } else {
      var re = new RegExp("(\\S+[\\b\\s]" + needle + "[\\b\\s]\\S+)", "i"),
        foundWords = haystack.match(re)[0].split(/\s+/),
        foundFragment = foundWords.join(" ");
      return foundFragment;
    }
  }

  var sentenceFragment = findWordAndNeighbours("score of", text);
  const sanitizedScore = () => ({
    __html: DOMPurify.sanitize(sentenceFragment),
  });

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
                {data.servings} servings.
              </li>
              <li>
                <HiClock className="icon" />
                ready in {data.readyInMinutes} mins.
              </li>
              <li>
                <AiFillDashboard className="icon" />
                <span dangerouslySetInnerHTML={sanitizedScore()}></span>
                <Button>
                  <AiOutlineQuestionCircle />
                </Button>
              </li>
            </ul>
            <div>
              {isFav ? (
                <Button
                  color="error"
                  type="submit"
                  size="large"
                  onClick={remove}
                >
                  <FavoriteIcon />
                </Button>
              ) : (
                <Button color="error" type="submit" size="large" onClick={add}>
                  <FavoriteBorderIcon /> Save to favorite
                </Button>
              )}

              <NutritionModal />
            </div>
          </div>
        </div>

        <div className="ingredientsTable"></div>
        <h2>Ingredients</h2>
        <div className="nutrition">
          <ul>
            {ingredients.map((i) => {
              return (
                <div className="ingredients" key={i}>
                  <MdOutlineCircle color="green" />
                  <li>{i} </li>
                </div>
              );
            })}
          </ul>
        </div>
        <h2>Instructions</h2>
        <ul>
          {instructions.map((i) => {
            return (
              <div className="ingredients" key={i}>
                <MdOutlineCircle color="green" />
                <li>{i}</li>
              </div>
            );
          })}
        </ul>
        <h2>Summary</h2>
        <Typography dangerouslySetInnerHTML={sanitizedData()}></Typography>
        <h2>Source URL</h2>
        <Link href={data.sourceUrl} target="_blank" underline="none">
          {data.sourceUrl}
        </Link>
      </div>
    </>
  );
};

export default Recipe;
