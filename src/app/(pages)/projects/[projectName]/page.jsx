"use client";
import DraggableBoard from "@/components/DraggableBoard/DraggableBoard";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { projectName } = useParams();

  return (
    <>
      <div>
        <h1>Project: {decodeURIComponent(projectName)}</h1>
      </div>
      <Box>
      <DraggableBoard/>         
    </Box>
    </>
  );
}