import {
  Box,
  Checkbox,
  Typography,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import useToggleSubTaskCompletion from "@/hooks/projects/task/subtask/useToggleSubTaskCompletion";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import useDeleteSubtask from "@/hooks/projects/task/subtask/useDeleteSubtask";
import AddSubTaskDialog from "./AddSubTaskDialog";
const SubTasksTab = () => {
  const theme = useTheme();
  const [selectedSubTask, setSelectedSubtask] = useState(null);
  const [subTaskPopupOpen, setSubTaskPopupOpen] = useState(false);
  const { loadingIdsToggle, subtasks, toggleCompletionSubTask } =
    useToggleSubTaskCompletion();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleToggle = async (subTaskId, completed) => {
    toggleCompletionSubTask(subTaskId, completed);
  };
  const {
    loading: loadingDeleteSubtask,
    error: errorDeleteSubtask,
    deleteSubTask,
  } = useDeleteSubtask();
  const completedCount = subtasks?.filter((task) => task?.completed)?.length;
  const totalCount = subtasks?.length;
  const progress = (completedCount / totalCount) * 100;

  const handleDialogClose = () => {
    setSubTaskPopupOpen(false);
  };

  const handleDeletePopupOpen = (subtask) => {
    setSelectedSubtask(subtask);
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
    setSelectedSubtask(null);
  };

  const handleMenuDeleteButton = async () => {
    await deleteSubTask(selectedSubTask?.id);
    handleDeletePopupClose();
  };

  return (
    <>
      <AddSubTaskDialog open={subTaskPopupOpen} onClose={handleDialogClose} />
      {deletePopupOpen && (
        <ConfirmationPopup
          title={"Delete Subtask"}
          handleClose={handleDeletePopupClose}
          open={deletePopupOpen}
          message={selectedSubTask?.title}
          type={"delete"}
          submitAction={handleMenuDeleteButton}
          loading={loadingDeleteSubtask}
        />
      )}
      <Box p={"24px 20px"}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography
              mb={1}
              fontSize={14}
              color={theme?.palette?.primary?.main}
            >
              {`${completedCount} of ${totalCount}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 2,
                height: 4,
                borderRadius: 4,
                backgroundColor: "rgba(0,167,111,0.24)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "rgb(44,167,111)",
                },
              }}
            />
          </Box>

          <List sx={{ padding: "0px !important" }}>
            {subtasks.map((subtask) => (
              <ListItem key={subtask.id} disablePadding sx={{ mt: 1 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Checkbox
                    edge="start"
                    checked={subtask.completed}
                    disabled={loadingIdsToggle.includes(subtask.id)}
                    onChange={() => handleToggle(subtask.id, subtask.completed)}
                    icon={
                      <CheckBoxOutlineBlankIcon
                        sx={{ fontSize: 20, borderRadius: 2 }}
                      />
                    }
                    checkedIcon={
                      <CheckBoxIcon
                        sx={{
                          fontSize: 20,
                          borderRadius: 2,
                          color: "rgb(44,167,111)",
                        }}
                      />
                    }
                    sx={{
                      p: 0.5,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      onClick={() =>
                        handleToggle(subtask.id, subtask.completed)
                      }
                      sx={{
                        fontSize: 14,
                        color: theme?.palette?.primary?.main,
                        cursor: "pointer",
                        width: "fit-content",
                        maxWidth: "100%",
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  }
                />
                <Box>
                  <IconButton onClick={() => handleDeletePopupOpen(subtask)}>
                    <img
                      src="/delete.svg"
                      alt="edit"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Button
            onClick={() => setSubTaskPopupOpen(true)}
            startIcon={<AddIcon sx={{ fontSize: "24px" }} />}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: 14,
              minWidth: 64,
              padding: "5px 12px",
              border: "1px solid rgba(145,158,171,0.32)",
              width: "fit-content",
              color: theme?.palette?.primary?.main,
              mt: 1,
            }}
          >
            Subtask
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SubTasksTab;
