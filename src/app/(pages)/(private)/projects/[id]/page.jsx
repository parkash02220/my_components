"use client";
import BoardSectionList from "@/components/DraggableBoard/BoardSectionList";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { useAppContext } from "@/context/AppContext";
import useGetProject from "@/hooks/projects/useGetProject";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const { loadingGetProject, getProjectById, projectData } = useGetProject(id);
  return (
    <>
      <Box
        className="active_project"
        overflow={"auto"}
        height={"calc(100vh - 100px)"}
      >
        {/* <KanbanBoard boardId={id} /> */}
        <BoardSectionList/>
      </Box>
    </>
  );
}
