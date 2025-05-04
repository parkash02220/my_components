"use client";
import { Box, CircularProgress } from "@mui/material";
import KanbanBoardWrapper from "@/components/kanban/KanbanBoardWrapper";
import useGetProject from "@/hooks/projects/useGetProject";

export default function ProjectPageContent({ id }) {
  const {
    getProjectById,
    activeProject,
    loadingActiveProject,
    errorActiveProject,
    projectVersion,
  } = useGetProject(id);

  if (loadingActiveProject || !activeProject) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <img
          src="/iosLoader.gif"
          alt="ios loader"
          style={{ width: "40px", height: "40px" }}
        />
      </Box>
    );
  }
  return (
    <KanbanBoardWrapper
      boardId={id}
      activeProject={activeProject}
      projectVersion={projectVersion}
    />
  );
}
