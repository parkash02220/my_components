"use client";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { useAppContext } from "@/context/AppContext";
import useGetProject from "@/hooks/projects/useGetProject";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const { state } = useAppContext();
  const { activeProject, projectVersion } = state;
  const { loadingGetProject, getProjectById } = useGetProject(id);
  
  return (
    <>
      <Box
        className="active_project"
        overflow={"auto"}
        height={"100%"}
      >
        {loadingGetProject ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"calc(100% - 64px)"}
          >
            <img src="/iosLoader.gif" width={"40px"} height={"40px"} />
          </Box>
        ) : (
          <KanbanBoard
            boardId={id}
            activeProject={activeProject}
            projectVersion={projectVersion}
          />
        )}
        {/* <BoardSectionList/> */}
      </Box>
    </>
  );
}
