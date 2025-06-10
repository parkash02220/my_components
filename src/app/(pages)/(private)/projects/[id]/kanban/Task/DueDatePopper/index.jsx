import {
  Popper,
  ClickAwayListener,
  Paper,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRef, useState } from "react";
import DueDatePickerContent from "./DueDatePickerContent";
import useEditTask from "@/hooks/projects/task/useEditTask";
import EventIcon from "@mui/icons-material/Event";
import { formatDueDateRange } from "@/utils";
export default function DueDatePopper({ taskStartDate, taskEndDate, taskId }) {
  const { loadingEditTask, errorEditTask, updateTaskInBackend } = useEditTask();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dueDateText = formatDueDateRange(taskStartDate, taskEndDate);
  const isDueDateAvailable = taskStartDate && taskEndDate;
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = async (start, end) => {
    await updateDueDate(start, end);
    setOpen(false);
  };

  const updateDueDate = async (startDate, endDate) => {
    if (!startDate || !endDate) return;
    await updateTaskInBackend(
      { due_start_date: startDate, due_end_date: endDate },
      taskId
    );
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          border: isDueDateAvailable ? "1px solid #637381" : "",
          borderRadius: "8px",
          padding: "4px",
          transition: "border-color 0.5s ease",
        }}
      >
        <EventIcon
          fontSize="small"
          sx={{
            color: "#637381",
          }}
        />
        {isDueDateAvailable && (
          <Typography fontSize={10} color="#637381" fontWeight={700}>
            {dueDateText}
          </Typography>
        )}
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ]}
        style={{ zIndex: 1300 }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={3}>
            <DueDatePickerContent
              taskStartDate={taskStartDate}
              taskEndDate={taskEndDate}
              onCancel={handleClose}
              onApply={handleApply}
              loading={loadingEditTask}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
