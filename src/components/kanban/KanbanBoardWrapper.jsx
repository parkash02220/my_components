"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import { Box } from "@mui/material";

export default function KanbanBoardWrapper({ boardId, currentProject }) {
  const { state,dispatch } = useAppContext();
  const {activeProject,projectVersion} = state;

  useEffect(() => {
    dispatch({ type: "SET_ACTIVE_PROJECT", payload: currentProject });
  }, [currentProject, dispatch]);

  return (
    <Box className="active_project" overflow={"auto"} height={"100%"}>
      <KanbanBoard
        boardId={boardId}
        activeProject={activeProject}
        projectVersion={projectVersion}
      />
    </Box>
  );
}
