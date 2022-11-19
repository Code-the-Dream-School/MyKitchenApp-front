import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { GiMilkCarton, GiPeanut, GiShrimp, GiJellyBeans } from 'react-icons/gi';
import { TbCheese, TbEgg } from "react-icons/tb";
import { CiWheat } from "react-icons/ci";
import { IoFishOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const SearchForm = () => {
  
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [checkbox, setCheckbox] = useState({
    intolerances: [],
    response: [],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckbox = (event) => {
    const { value, checked } = event.target;
    const { intolerances } = checkbox;

    console.log(`${value} is ${checked}`);

    if (checked) {
      setCheckbox({
        intolerances: [...intolerances, value],
        response: [...intolerances, value],
      });
    } else {
      setCheckbox({
        intolerances: intolerances.filter((event) => event !== value),
        response: intolerances.filter((event) => event !== value),
      });
    }
  };
  
  console.log(searchInput)

  const handleSearch = (event) => {
    event.preventDefault();
    const path = location.pathname !== 'searchresult' ? `/searchresult/${searchInput}`: '/';
    handleClose();
    navigate(path, { replace: true });
  };

  const Dairy = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Dairy</Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <GiMilkCarton fontSize="big" />
        <TbCheese />
      </Box>
    </Box>
  );
  const Egg = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Egg</Typography>
      <TbEgg />
    </Box>
  );
  const Gluten = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Gluten</Typography>
      <CiWheat />
    </Box>
  );
  const Peanut = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Peanut</Typography>
      <GiPeanut />
    </Box>
  );
  const Seafood = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Seafood</Typography>
      <IoFishOutline />
    </Box>
  );
  const Shellfish = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Shellfish</Typography>
      <GiShrimp />
    </Box>
  );
  const Soy = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Soy</Typography>
      <GiJellyBeans />
    </Box>
  );

  return (
    <div>
      <StyledButton onClick={handleClickOpen}>
        New Recipe Search
      </StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To search a new recipe, please fill the form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ingredients"
            type="text"
            fullWidth
            variant="filled"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <DialogContentText>Intolerances:</DialogContentText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Dairy}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Egg}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Gluten}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Peanut}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Seafood}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Shellfish}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={Soy}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSearch}
            // value={checkbox}
            // onChange={handleCheckbox}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

const StyledButton = styled.button`
  // background-image: url('/public/food-search-button.png');
  // background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  text-decoration: none;
  background: linear-gradient(35deg, #f6d365 0%, #fda085 51%, #f6d365 100%);
  background-position: right center;
  padding: 20px;
  text-transform: uppercase;
  width: 10rem;
  height: 5rem;
  cursor: pointer;
  transform: scale(0.8);
  color: white;
  font-size: 1rem;
  box-shadow: 
    4px 4px 3px #446930,
    1px 1px 0 #223716;

  &:active{
    box-shadow: 
      1px 1px 0 black,
      1px 1px 0 black;
  }
`;

export default SearchForm;
