import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SearchForm = ({ setOpen, open }) => {
  const [searchInput, setSearchInput] = useState("");
  const [checked, setChecked] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Peanut",
    "Seafood",
    "Shellfish",
    "Soy",
  ];

  const handleClose = () => {
   setOpen(false)
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
    const trimedSearchInput = searchInput.trim();
    let path =
      location.pathname !== "searchresult"
        ? `/searchresult/${trimedSearchInput}/${allIntolerances}`
        : "/";
    navigate(path, { replace: true });
    handleClose();
  };

  return (
    <div>
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
            placeholder="chicken breast, brown rice"
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
          <Button onClick={handleSearch} disabled={!searchInput} >Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchForm;
