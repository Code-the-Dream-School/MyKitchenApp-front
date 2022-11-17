import React from "react";
import { Container, Box, Grid } from "@mui/material";
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
          right: 0 
        }}
      >
        <Container maxWidth="lg">
          <Grid>
            My Kitchen App &#169; {new Date().getFullYear()} 
          </Grid>
          <Grid>
            Powered by {" "}
            <Link color="inherit" underline="hover" href="https://spoonacular.com/food-api">
              Spoonacular API
            </Link>           
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default FooterPublic;
