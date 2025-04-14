"use client";
import BoardSectionList from "@/components/DraggableBoard/BoardSectionList";
import { useAppContext } from "@/context/AppContext";
import useGetProject from "@/hooks/projects/useGetProject";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const [loadingGetProject] = useGetProject(id);
  return (
    <>
      <Box
        className="active_project"
        overflow={"auto"}
        height={"calc(100vh - 100px)"}
      >
        {loadingGetProject ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <CircularProgress />
          </Box>
        ) : (
          <BoardSectionList />
        )}
      </Box>
    </>
  );
}
