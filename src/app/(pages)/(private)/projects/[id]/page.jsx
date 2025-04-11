"use client";
import BoardSectionList from "@/components/DraggableBoard/BoardSectionList";
import { useAppContext } from "@/context/AppContext";
import useGetProject from "@/hooks/projects/useGetProject";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const [loadingGetProject, getProjectById] = useGetProject(id);
  return (
    <>
      <Box>
        <BoardSectionList />
      </Box>
    </>
  );
}
