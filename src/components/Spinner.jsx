import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = ({ size }) => {
  return (
    <Box
      sx={{
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <CircularProgress
        color="inherit"
        size={size}
        thickness={Math.min(4, size / 10)}
        sx={{ color: "rgb(8,152,169)" }}
      />
    </Box>
  );
};

export default Spinner;
