"use client";
import BoardSectionList from "@/components/DraggableBoard/BoardSectionList";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { projectName } = useParams();

  return (
    <>
      <div>
        <h1>Project: {decodeURIComponent(projectName)}</h1>
      </div>
      <Box>
      <BoardSectionList/>      
    </Box>
    </>
  );
}