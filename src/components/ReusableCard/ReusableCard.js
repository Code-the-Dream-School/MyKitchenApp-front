import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function RecipeReviewCard({ title, image, id }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <CardHeader title={title} />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Recipe image"
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
