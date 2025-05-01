"use client";

import useAllProjects from "@/hooks/projects/useGetAllProjects";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        className="homePage__container"
      >
        Select or create project
      </Box>
    </>
  );
}
