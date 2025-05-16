"use client";
import { Box, CircularProgress } from "@mui/material";
import useGetProject from "@/hooks/projects/useGetProject";
import { useRouter } from "next/navigation";
import KanbanBoardWrapper from "./kanban/Board/KanbanBoardWrapper";

export default function ProjectPageContent({ id }) {
  const router = useRouter();
  const {
    getProjectById,
    activeProject,
    loadingActiveProject,
    errorActiveProject,
    projectVersion,
    isNotFound,
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
  if(isNotFound){
       router.push('/not-found');
  }
  return (
    <KanbanBoardWrapper
      boardId={id}
      activeProject={activeProject}
      projectVersion={projectVersion}
    />
  );
}
