"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Scrollbar from "react-scrollbars-custom";
import { TaskCard } from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useCreateTask from "@/hooks/projects/task/useCreateTask";
import MyTextField from "../MyTextfield/MyTextfield";
import { Collapse, Fade, Menu, MenuItem } from "@mui/material";
import useClearSection from "@/hooks/projects/section/useClearSection";
import useDeleteSection from "@/hooks/projects/section/useDeleteSection";
import useUpdateSectionName from "@/hooks/projects/section/useUpdateSectionName";
import ConfirmationPopup from "../ConfirmationPopup";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";

function BoardColumnComponent({ column, tasks, isOverlay, activeColumnId }) {
  const {isXs} = useBreakpointFlags();
  const { loadingClearSection, clearSection } = useClearSection();
  const { loadingDeleteSection, deleteSection } = useDeleteSection();
  const editSectionNameRef = useRef(null);
  const [showEditTextfield, setShowEditTextfield] = useState(false);
  const {
    columnName,
    loadingUpdateColumnName,
    handleColumnNameInputfieldChange,
    handleColumnInputKeyDown,
    startEditing,
    cancelEditing,
  } = useUpdateSectionName(column?.title, setShowEditTextfield);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editedLabel, setEditedLabel] = useState(column?.title || "");
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const inputRef = useRef(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const {
    newTaskName,
    loadingCreateTask,
    handleTaskInputfieldChange,
    handleTaskInputKeyDown,
    setNewTaskName,
  } = useCreateTask(column?.id, setCreateTaskOpen);
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const isActive = column.id === activeColumnId && !isOverlay;
  const sortableData = useMemo(
    () => ({
      type: "Column",
      column,
    }),
    [column]
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: sortableData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const columnStyle = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isOverlay ? 0.75 : isActive ? 0.5 : 1,
    }),
    [transform, transition, isOverlay]
  );

  const handleCreateTaskOpen = () => {
    setCreateTaskOpen((pre) => !pre);
  };
  useEffect(() => {
    if (createTaskOpen && inputRef.current) {
      inputRef.current.querySelector("input")?.focus();
    }
  }, [createTaskOpen]);

  useEffect(() => {
    if (showEditTextfield && editSectionNameRef.current) {
      editSectionNameRef.current.querySelector("input")?.focus();
    }
  }, [showEditTextfield]);

  const handleCreateTaskTextFieldBlur = () => {
    setTimeout(() => {
      setCreateTaskOpen(false);
    }, 100);
    setNewTaskName("");
  };

  const handleDeletePopupOpen = () => {
    handleMenuClose();
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };

  const handleMenuEditButton = () => {
    handleMenuClose();
    setTimeout(() => {
      startEditing(column.title);
      setShowEditTextfield(true);
    }, 100);
  };

  const handleMenuClearButton = () => {
    clearSection(column?.id);
    handleMenuClose();
  };

  const handleMenuDeleteButton = async () => {
   await deleteSection(column?.id);
    handleDeletePopupClose();
  };

  const menuItems = [
    {
      label: "Rename",
      icon: "/rename.svg",
      onClick: handleMenuEditButton,
    },
    {
      label: "Clear",
      icon: "/clear.svg",
      onClick: handleMenuClearButton,
    },
    {
      label: "Delete",
      icon: "/delete.svg",
      onClick: handleDeletePopupOpen,
      color: "#FF5630",
    },
  ];

  const handleBlurUpdateSectionName = () => {
    cancelEditing();
    setShowEditTextfield(false);
  };

  return (
    <>
    <ConfirmationPopup
        title={"Delete Section"}
        handleClose={handleDeletePopupClose}
        open={deletePopupOpen}
        message={columnName}
        type={"delete"}
        submitAction={handleMenuDeleteButton}
        loading={loadingDeleteSection}
      />
    <Paper
      ref={setNodeRef}
      elevation={isOverlay ? 6 : 3}
      style={{
        height: "100%",
        width: 336,
        ...columnStyle,
        backgroundColor: "#F4F6F8",
        borderStyle: "solid",
        border: "transparent",
        flexShrink: 0,
        scrollSnapAlign: "center",
        borderRadius: "16px",
        padding: "20px 16px 16px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // borderBottom="2px solid #ddd"
        height={"50px"}
      >
        <Box display={"flex"} alignItems={"center"} gap={1} flex={1}>
          <Typography
            sx={{
              height: "24px",
              minWidth: "24px",
              background: "rgba(145,158,171,0.16)",
              whiteSpace: "nowrap",
              color: "#637381",
              borderRadius: "50%",
              fontWeight: 700,
              fontSize: "12px",
              borderColor: "rgba(145,158,171,0.24)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 6px",
              borderRadius: "50%",
            }}
          >
            {tasks?.length || 0}
          </Typography>
          {showEditTextfield ? (
            <Fade in={showEditTextfield} timeout={600}>
              <Box>
                <MyTextField
                  ref={editSectionNameRef}
                  placeholder="Untitled"
                  label=""
                  fontWeight={600}
                  borderColor="black"
                  background={"#F4F6F8"}
                  value={columnName}
                  onChange={handleColumnNameInputfieldChange}
                  onKeyDown={(e) => handleColumnInputKeyDown(e, column?.id)}
                  onBlur={handleBlurUpdateSectionName}
                  fullWidth={true}
                  minWidth="0px"
                  loading={loadingUpdateColumnName}
                  inputFontSize="16px"
                />
              </Box>
            </Fade>
          ) : (
            <Typography
              variant="subtitle1"
              onClick={() => setShowEditTextfield(true)}
              sx={{
                fontWeight: 600,
                color: "rgb(35, 37, 46)",
                width: "100%",
                cursor: "text",
              }}
            >
              {columnName}
            </Typography>
          )}
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Box
            sx={{
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleCreateTaskOpen}
              sx={{
                color: "white",
                padding: "0px",
                width: "20px",
                height: "20px",
              }}
            >
              <img
                src="/addTaskIcon.svg"
                alt="add task icon"
                width={"100%"}
                height={"100%"}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                padding: "0px",
                width: "20px",
                height: "20px",
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <img
                src="/columnMenuIcon.svg"
                alt="column menu icon"
                width={"100%"}
                height={"100%"}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              {...attributes}
              {...listeners}
              size="small"
              style={{
                cursor: "grab",
                color: "#999",
                width: "20px",
                height: "20px",
                padding: "0px",
              }}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <span className="sr-only">{`Move column: ${column.title}`}</span>
              <img
                src="/columnDragIcon.svg"
                alt="drag column icon"
                width={"100%"}
                height={"100%"}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            background: "#FFFFFFE6",
            boxShadow:
              "0px 5px 5px -3px rgba(145 158 171 / 0.2),0px 8px 10px 1px rgba(145 158 171 / 0.14),0px 3px 14px 2px rgba(145 158 171 / 0.12)",
            color: "#1C252E",
            backgroundColor: "rgba(255,255,255)",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={item.onClick}
            sx={{
              backgroundColor: "transparent",
              margin: "0px",
              marginInline: "3px",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "6px",
              minHeight:isXs ? '40px' : '48px',
            }}
          >
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              minWidth="140px"
              mb={"4px"}
            >
              <img
                src={item.icon}
                alt={item.label.toLowerCase()}
                width={20}
                height={20}
              />
              <Typography fontSize={14} color={item.color || "inherit"}>
                {item.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {createTaskOpen ? (
        <Box className="createTaskBox" mb={2}>
          <MyTextField
          fullWidth={true}
            ref={inputRef}
            id="newTaskName"
            placeholder="Untitled"
            label=""
            fontWeight={700}
            borderColor="transparent"
            background={"white"}
            value={newTaskName}
            onChange={handleTaskInputfieldChange}
            onKeyDown={handleTaskInputKeyDown}
            onBlur={handleCreateTaskTextFieldBlur}
            loading={loadingCreateTask}
          />
          <Typography
            sx={{
              color: "rgb(122,125,161)",
              fontSize: "12px",
              mt: 1,
              ml: 1,
            }}
          >
            Press Enter to create task.
          </Typography>
        </Box>
      ) : null}

      <Box
        sx={{
          height: "calc(100% - 60px)",
          width: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <SortableContext items={taskIds}>
            {tasks?.length < 1 ? (
              <Box
                className="emptySection"
                height={"inherit"}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"14px"}
                  textAlign={"center"}
                  fontWeight={"600"}
                  color="#919EAB"
                >
                  Looks like this section is empty. Let's add some tasks!
                </Typography>
              </Box>
            ) : (
              tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </SortableContext>
        </Box>
      </Box>
    </Paper>
    </>
  );
}

export const BoardColumn = React.memo(BoardColumnComponent);
