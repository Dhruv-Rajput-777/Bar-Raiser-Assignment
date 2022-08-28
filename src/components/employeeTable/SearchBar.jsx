import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, MenuItem, FormControl, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0898a9",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "0.8rem",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = ({ query, setQuery, queryType, setQueryType }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "inherit",
      }}
    >
      <Search
        sx={{
          display: "flex",
          border: "thin solid rgb(8,152,169,0.6)",
          borderRadius: "0.3rem",
          marginRight: "0.4rem",
          fontSize: "0.8rem",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          fontSize="inherit"
          placeholder="Search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </Search>

      <FormControl
        sx={{
          height: "inherit",
          padding: "0rem",
          margin: "0",
          border: "none",
        }}
      >
        <Select
          sx={{
            padding: "0",
            margin: "0",
            height: "inherit",
            fontSize: "0.8rem",
          }}
          onChange={(e) => {
            setQueryType(e.target.value);
          }}
          value={queryType}
        >
          <MenuItem value="name" sx={{ fontSize: "0.8rem" }}>
            Name
          </MenuItem>
          <MenuItem value="designation" sx={{ fontSize: "0.8rem" }}>
            Designation
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchBar;
