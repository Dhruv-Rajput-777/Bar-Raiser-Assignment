import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", borderBottom: "thin solid #e6e6e6" }}
    >
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "white",
          color: "rgb(8,152,169)",
          gap: "2rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "550", ":hover": { cursor: "pointer" } }}
          onClick={() => navigate("/")}
        >
          Employee Data
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "550", ":hover": { cursor: "pointer" } }}
          onClick={() => navigate("/hierarchicalData")}
        >
          Hierarchical Data
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
