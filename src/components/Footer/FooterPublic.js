import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const FooterPublic = () => {
  return (
    <footer>
      <Box
        bgcolor="text.secondary"
        color="white"
        textAlign="center"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Container maxWidth="lg">
          <Grid>My Kitchen App &#169; {new Date().getFullYear()}</Grid>
          <Grid>
            Powered by{" "}
            <Link              
              href="https://spoonacular.com/food-api"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              Spoonacular API
            </Link>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default FooterPublic;
