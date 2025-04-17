"use client";
import BoardSectionList from "@/components/DraggableBoard/BoardSectionList";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Loader from "@/components/Loader/Loader";
import { useAppContext } from "@/context/AppContext";
import useGetProject from "@/hooks/projects/useGetProject";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const { state } = useAppContext();
  const { activeProject } = state;
  const { loadingGetProject, getProjectById } = useGetProject(id);
  return (
    <>
      <Box
        className="active_project"
        overflow={"auto"}
        height={"calc(100vh - 75px)"}
      >
        <Box>
          <Typography variant="h4" fontSize={'1.5rem'} fontWeight={700} color="iC252E" paddingInline={2}>{activeProject?.name}</Typography>
        </Box>
        {loadingGetProject ? (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'calc(100% - 35px)'}>
            <Loader/>
          </Box>
        ) : (
          <KanbanBoard boardId={id} activeProject={activeProject} />
        )}
        {/* <BoardSectionList/> */}
      </Box>
    </>
  );
}
