"use client";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        className="homePage__container"
      >
        <Typography variant="primary">Select or create project</Typography>
      </Box>
    </>
  );
}
