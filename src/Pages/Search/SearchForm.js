import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";

const SearchForm = () => {
  
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [checked, setChecked] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  const intolerances = ["Dairy", "Egg", "Gluten", "Peanut", "Seafood", "Shellfish", "Soy"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckbox = (event) => {
    let checkedIntolerance = [...checked];
    if (event.target.checked) {
      checkedIntolerance = [...checked, event.target.value];
    } else {
      checkedIntolerance.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(checkedIntolerance);
  };

  const allIntolerances = checked.length 
    ? checked.reduce((total, item) => {
        return total + "," + item;
    })
    : "";
    
  const handleSearch = (event) => {
    event.preventDefault();
    let path = location.pathname !== "searchresult" ? `/searchresult/${searchInput}/${allIntolerances}` : "/";
    navigate(path, { replace: true });
  };
  
  return (
    <div>
      <StyledButton onClick={handleClickOpen}>
        New Recipe Search
        <SearchIcon />
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
            placeholder="chicken, pasta"
          />

          <div className="checkList">
            <div className="title">Intolerances:</div>
            <div className="list-container">
              {intolerances.map((item, index) => (
                <div key={index}>
                  <input
                    value={item}
                    type="checkbox"
                    onChange={handleCheckbox}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

const StyledButton = styled.button`
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
  color: black;
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
