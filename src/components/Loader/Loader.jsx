import React from "react";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: "6px solid transparent",
        borderTop: "6px solid",
        borderImage: "linear-gradient(45deg, #42a5f5, #7e57c2) 1",
        animation: "spin 1s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        margin: "auto",
      }}
    />
  );
};

export default Loader;
