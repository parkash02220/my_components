"use client";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Loader from "@/components/Loader/Loader";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { useAppContext } from "@/context/AppContext";
import useDeleteProject from "@/hooks/projects/useDeleteProject";
import useGetProject from "@/hooks/projects/useGetProject";
import useUpdateProjectName from "@/hooks/projects/useUpdateProjectName";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProjectPage() {
  const router = useRouter();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const { id } = useParams();
  const { state } = useAppContext();
  const { activeProject, projectVersion } = state;
  const { loadingGetProject, getProjectById } = useGetProject(id);
  const inputRef = useRef();
  const [showProjectNameTextfield, setShowProjectNameTextfield] =
    useState(false);
  const {
    loadingUpdateProjectName,
    errorUpdateProjectName,
    helperTextUpdateProjectName,
    startEditing,
    cancelEditing,
    handleProjectInputChange,
    handleUpdateProjectName,
    handleProjectInputKeyDown,
    projectName,
  } = useUpdateProjectName(activeProject?.name, setShowProjectNameTextfield);
  const { loadingDeleteProject, errorDeleteProject, deleteProject } =
    useDeleteProject();
  const handleProjectNameBlur = () => {
    cancelEditing();
    setShowProjectNameTextfield(false);
  };
  const handleProjectNameStartEdidting = () => {
    startEditing(activeProject?.name);
    setShowProjectNameTextfield(true);
  };
  useEffect(() => {
    if (showProjectNameTextfield && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showProjectNameTextfield]);

  const handleDeleteProject = async () => {
    await deleteProject(activeProject?.id);
    setDeletePopupOpen(false);
    router.push("/");
  };

  const handleDeletePopupOpen = () => {
    setDeletePopupOpen(true);
  };

  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  return (
    <>
      <ConfirmationPopup
        title={"Delete Project"}
        handleClose={handleDeletePopupClose}
        open={deletePopupOpen}
        message={activeProject?.name}
        type={"delete"}
        submitAction={handleDeleteProject}
        loading={loadingDeleteProject}
      />
      <Box
        className="active_project"
        overflow={"auto"}
        height={"calc(100vh - 75px)"}
      >
        {!loadingGetProject ? (
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Box>
              {showProjectNameTextfield ? (
                <MyTextField
                  inputRef={inputRef}
                  label=""
                  name="projectName"
                  value={projectName || ""}
                  onChange={handleProjectInputChange}
                  onBlur={handleProjectNameBlur}
                  onKeyDown={(e) =>
                    handleProjectInputKeyDown(e, activeProject?.id)
                  }
                  minWidth="300px"
                  loading={loadingUpdateProjectName}
                  error={errorUpdateProjectName}
                  helperText={helperTextUpdateProjectName}
                  acitveBorder={"2px solid #1C252E"}
                />
              ) : (
                <Typography
                  variant="h4"
                  fontSize={"1.5rem"}
                  fontWeight={700}
                  color="1C252E"
                  paddingLeft={2}
                  onClick={handleProjectNameStartEdidting}
                >
                  {activeProject?.name}
                </Typography>
              )}
            </Box>
            <Box display={"flex"} gap={"2px"} alignItems={"center"}>
              <Box
                onClick={handleProjectNameStartEdidting}
                sx={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(99,115,129,0.08)",
                  },
                }}
              >
                <img
                  src="/rename.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    textIndent: "10000px",
                  }}
                />
              </Box>
              <Box
                onClick={handleDeletePopupOpen}
                sx={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(99,115,129,0.08)",
                  },
                }}
              >
                <img
                  src="/delete.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    textIndent: "10000px",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ) : null}
        {loadingGetProject ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"calc(100% - )"}
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
