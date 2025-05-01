"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import KanbanBoardWrapper from "@/components/kanban/KanbanBoardWrapper";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useRouter } from "next/navigation";
import useGetProject from "@/hooks/projects/useGetProject";
import { useAppContext } from "@/context/AppContext";

export default function ProjectPageContent({ id }) {
  const { state } = useAppContext();
  const { activeProject, loading, projectVersion } = state;
  const loadingActiveProject = loading?.activeProject;
  const { getProjectById } = useGetProject(id);

  if (loadingActiveProject || !activeProject) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
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
