"use client";
import KanbanBoard from "./KanbanBoard";
import { Box } from "@mui/material";

export default function KanbanBoardWrapper({
  boardId,
  activeProject,
  projectVersion,
}) {
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
