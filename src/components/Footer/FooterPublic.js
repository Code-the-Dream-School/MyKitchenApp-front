import React from "react";
import { Container, Box } from "@mui/material";

const FooterPublic = () => {
  return <footer>
  <Box bgcolor="text.secondary" color="white" textAlign="center" pt="5" pb="0">
    <Container maxWidth="lg">      
      My Kitchen App &#169; {new Date().getFullYear()}
    </Container>
  </Box>
</footer>
};

export default FooterPublic;
