import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { GiCook } from "react-icons/gi";
import { HiClock } from "react-icons/hi";
import { ImLeaf } from "react-icons/im";
import { GiMuscleUp, GiCow } from "react-icons/gi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";
import { FaCarrot } from "react-icons/fa";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";
import DOMPurify from "dompurify";
import Loading from "../../components/Loading/Loading";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

export default function Recipe({ theme }) {
  const [data, setData] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [isFav, setIsFav] = useState("");
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;

  const token = localStorage.getItem("myKitchenAppToken");
  const errorMessage = "A server error occurred. Please try again later. ";
  const fetchRecipe = async () => {
    const recipe = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipe;
  };

  useEffect(() => {
    setIsLoading(true); // Set loading before sending API request
    fetchRecipe()
      .then((response) => {
        setData(response.data);
        setIngredients(response.data.ingredients);

        setInstructions(response.data.instructions);
        setIsFav(response.data.isFavorite);
        setIsLoading(false); //Hide loading
      })
      .catch((e) => setErr(errorMessage));
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

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
  });

  return (
    <>
      {err ? (
        <h1 className="greet">{err}</h1>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  p: 2,
                  marginTop: "5rem",
                  flexGrow: 1,
                  borderRadius: "2rem",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  // [theme.breakpoints.down("md")]: {},
                  //[theme.breakpoints.down("sm")]: {},
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      flexDirection: "column",
                      flexWrap: "nowrap",
                    },
                    //[theme.breakpoints.down("sm")]: {},
                  }}
                >
                  <Grid item>
                    <ButtonBase
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Img alt={data.title} src={data.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{
                            fontSize: "2rem",
                          }}
                        >
                          {data.title}
                        </Typography>

                        {data.cuisines ? (
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ fontSize: "1.1rem" }}
                          >
                            <GiCook
                              style={{
                                margin: "0 1.2rem 0 1.1rem",
                              }}
                            />
                            {data.cuisines[1] || data.cuisines[0] || `Any `}{" "}
                            cuisine.
                          </Typography>
                        ) : null}
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1.1rem" }}
                        >
                          <ImSpoonKnife
                            style={{
                              margin: "0 1.2rem 0 1.1rem",
                            }}
                          />
                          {data.servings} servings.
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1.1rem" }}
                        >
                          <HiClock
                            style={{
                              margin: "0 1.2rem 0 1.1rem",
                            }}
                          />
                          ready in {data.readyInMinutes} mins.
                        </Typography>
                        {isFav ? (
                          <Button
                            color="error"
                            type="submit"
                            size="large"
                            onClick={remove}
                          >
                            <FavoriteIcon
                              style={{
                                margin: "0 1.2rem 0 0",
                              }}
                            />{" "}
                            Saved
                          </Button>
                        ) : (
                          <Button
                            color="error"
                            type="submit"
                            size="large"
                            onClick={add}
                          >
                            <FavoriteBorderIcon
                              style={{
                                margin: "0 1.2rem 0 0",
                              }}
                            />{" "}
                            Save to favorite
                          </Button>
                        )}
                        <NutritionModal />
                        <ul className="diets">
                          <li
                            className="squareVeg"
                            style={{ background: " #33b5e5" }}
                          >
                            Health {data.healthScore}%
                            <GiMuscleUp />
                          </li>
                          {data.veryPopular ? (
                            <li
                              className="squareVeg"
                              style={{ background: " #ff4444" }}
                            >
                              Popular
                              <BsFillArrowUpCircleFill />
                            </li>
                          ) : null}
                          {data.glutenFree ? (
                            <li
                              className="squareVeg"
                              style={{ background: " #ffbb33" }}
                            >
                              Gluten-free
                              <CiWheat />
                            </li>
                          ) : null}
                          {data.dairyFree ? (
                            <li
                              className="squareVeg"
                              style={{ background: " #ffbb33" }}
                            >
                              Diary-free
                              <GiCow />
                            </li>
                          ) : null}
                          {data.vegetarian ? (
                            <li
                              className="squareVeg"
                              style={{ background: " #99cc00" }}
                            >
                              Vegetarian
                              <FaCarrot />
                            </li>
                          ) : null}
                          {data.vegan ? (
                            <li
                              className="squareVeg"
                              style={{ background: " #99cc00" }}
                            >
                              Vegan
                              <ImLeaf />
                            </li>
                          ) : null}
                        </ul>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  margin: "5rem 0 10rem 0",
                  flexGrow: 1,
                  borderRadius: "2rem",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  [theme.breakpoints.down("sm")]: {
                    marginBottom: "12rem",
                    fontSize: "0.8rem",
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          Ingredients
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{
                            fontSize: "1.1rem",
                            [theme.breakpoints.down("sm")]: {
                              paddingRight: "40px",
                            },
                          }}
                        >
                          {ingredients.map((i) => {
                            return (
                              <li key={i} className="ingredientsList">
                                {i}
                              </li>
                            );
                          })}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          Instructions
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{
                            fontSize: "1.1rem",

                            [theme.breakpoints.down("sm")]: {
                              paddingRight: "40px",
                            },
                          }}
                        >
                          {instructions.map((i) => {
                            return (
                              <li key={i} className="ingredientsList">
                                {i}
                              </li>
                            );
                          })}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          Summary
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{
                            fontSize: "1.1rem",
                            textAlign: "justify",
                            textJustify: "interWord",

                            [theme.breakpoints.down("sm")]: {
                              paddingRight: "40px",
                            },
                          }}
                          dangerouslySetInnerHTML={sanitizedData()}
                          className="recipeLink"
                        ></Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          Source URL
                        </Typography>
                        <Link
                          href={data.sourceUrl}
                          target="_blank"
                          underline="none"
                          color="#1976d2"
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: "0.9rem",
                              paddingRight: "40px",
                            },
                          }}
                        >
                          {data.sourceUrl}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </>
      )}
    </>
  );
}
