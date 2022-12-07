import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

export default function RecipeReviewCard(props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 380,
        minWidth: 345,
        minHeight: 380,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        borderRadius: "2rem",
        textAlign: "center",
      }}
    >
      <CardHeader
        sx={{
          fontSize: "1.2rem",
          textDecoration: "none",
        }}
        title={props.title}
      />
      <CardMedia
        component="img"
        height="250"
        image={props.image}
        alt={`Recipe img for ${props.title}`}
      />
    </Card>
  );
}
