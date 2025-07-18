"use client";

import { throttle } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import * as actions from "@/context/Task/action";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { customCollisionDetection, hasDraggableData } from "../utils";
import { TaskCard } from "../Task";
import useGetProject from "@/hooks/projects/useGetProject";
import useMoveTask from "@/hooks/projects/task/useMoveTask";
import useUpdateColumnPosition from "@/hooks/projects/section/useUpdateColumnPosition";
import useCreateSection from "@/hooks/projects/section/useCreateSection";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import KanbanRightDrawer from "../Drawer/KanbanRightDrawer";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { BoardColumn } from "../Column/BoardColumn";
import { useTaskContext } from "@/context/Task/TaskContext";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

export default function KanbanBoard({
  boardId,
  activeProject,
  projectVersion,
}) {
  const {isXs,isSm,isMd,isLg} = useResponsiveBreakpoints();
  const [openDrawer, setOpenDrawer] = useState(false);
  const inputRef = useRef(null);
  const wasDragged = useRef(false);
  const { dispatch } = useTaskContext();
  const [showAddColumnButton, setShowAddColumnButton] = useState(true);
  const {
    loadingCreateColumn,
    errorCreateColumn,
    helperTextCreateColumn,
    newColumnName,
    handleColumnInputfieldChange,
    handleColumnInputKeyDown,
    setNewColumnName,
  } = useCreateSection(boardId, setShowAddColumnButton);
  const { loadingUpdatingColoumPos, updateColumnPosition } =
    useUpdateColumnPosition();
  const { loadingMoveTask, moveTask } = useMoveTask();
  const throttledSetTasks = useRef(
    throttle((updateFn) => {
      setTasks(updateFn);
    }, 100)
  ).current;

  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!activeProject) return;
    const sortedSections = [...(activeProject?.sections || [])].sort(
      (a, b) => a?.position - b?.position
    );

    // Convert to columns and tasks format
    const columnData = sortedSections?.map((section) => ({
      id: section?.id,
      title: section?.name,
    }));

    const taskData = sortedSections?.flatMap((section) =>
      (section?.tasks || []).map((task) => ({
        id: task?.id,
        content: { ...task },
        columnId: section?.id,
      }))
    );

    setColumns(columnData);
    setTasks(taskData);
  }, [activeProject, projectVersion]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const pickedUpTaskColumn = useRef(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter })
  );

  const onDragStart = (event) => {
    wasDragged.current = false;
    const data = event.active?.data?.current;
    if (!hasDraggableData(event.active)) return;

    if (data?.type === "Column") {
      setActiveColumn(data.column);
    }

    if (data?.type === "Task") {
      pickedUpTaskColumn.current = data.task.columnId;
      setActiveTask(data.task);
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);
  
    const { active, over } = event;
    if (!over || !hasDraggableData(active)) return;
  
    const activeId = active.id;
    const overId = over.id;
    const activeData = active.data.current;
  
    if (!wasDragged.current) {
      if (activeData.type === "Task") {
        setActiveTaskId(null);
        setTimeout(() => setActiveTaskId(activeData?.task?.id), 0);
      }
      return;
    }
  
    if (activeData.type === "Column") {
      const fromIndex = columns.findIndex((c) => c.id === activeId);
      const toIndex = columns.findIndex((c) => c.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
  
      const newColumns = arrayMove(columns, fromIndex, toIndex);
      setColumns(newColumns);
  
      if (fromIndex !== toIndex) {
        updateColumnPosition(activeId, toIndex + 1, boardId);
      }
      return;
    }
  
    if (activeData.type === "Task") {
      const activeTaskIndex = tasks.findIndex((t) => t?.id === activeId);
      if (activeTaskIndex === -1) return;
  
      const activeTaskItem = tasks[activeTaskIndex];
      const overData = over?.data?.current;
  
      const isOverAColumn = overData?.type === "Column";
      const isOverATask = overData?.type === "Task";
  
      let newTasks = [...tasks];
      let targetColumnId = activeTaskItem.columnId;
      let newPosition = 0;
  
      if (isOverAColumn) {
        targetColumnId = overId;
  
        newTasks = newTasks.filter((t) => t?.id !== activeId);
  
        const insertIndex = newTasks.findIndex(
          (t) => t.columnId === targetColumnId
        );
        const updatedTask = { ...activeTaskItem, columnId: targetColumnId };
  
        if (insertIndex === -1) {
          newTasks.push(updatedTask);
          newPosition = 1;
        } else {
          newTasks.splice(insertIndex, 0, updatedTask);
          const droppedColumnTasks = newTasks.filter(
            (t) => t.columnId === targetColumnId
          );
          newPosition = droppedColumnTasks.findIndex((t) => t.id === activeId) + 1;
        }
  
      } else if (isOverATask) {
        const overTaskIndex = newTasks.findIndex((t) => t.id === overId);
        if (overTaskIndex === -1) return;
  
        const overTask = newTasks[overTaskIndex];
        targetColumnId = overTask.columnId;
  
        newTasks = newTasks.filter((t) => t.id !== activeId);
        const updatedTask = { ...activeTaskItem, columnId: targetColumnId };
  
        newTasks.splice(overTaskIndex, 0, updatedTask);
  
        const droppedColumnTasks = newTasks.filter(
          (t) => t.columnId === targetColumnId
        );
        newPosition = droppedColumnTasks.findIndex((t) => t.id === activeId) + 1;
      } else {
        return;
      }
  
      setTasks(newTasks);
  
      moveTask(activeId, targetColumnId, newPosition);
  
      return;
    }
  
    pickedUpTaskColumn.current = null;
  };
  

  const onDragOver = (event) => {
    if (Math.abs(event.delta.x) > 5 || Math.abs(event.delta.y) > 5) {
      wasDragged.current = true;
    }
    const { active, over } = event;
    if (!over || !hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type !== "Task") return;

    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    throttledSetTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const activeTask = tasks[activeIndex];
      if (!activeTask) return tasks;

      let newTasks = [...tasks];

      if (isOverATask) {
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const overTask = tasks[overIndex];
        if (!overTask) return tasks;

        if (
          activeTask.id === overTask.id &&
          activeTask.columnId === overTask.columnId
        ) {
          return tasks;
        }

        const updatedTask = {
          ...activeTask,
          columnId: overTask.columnId,
        };

        if (
          activeTask.columnId === updatedTask.columnId &&
          activeIndex === overIndex
        ) {
          return tasks;
        }

        newTasks[activeIndex] = updatedTask;
        return arrayMove(newTasks, activeIndex, overIndex - 1);
      }

      if (isOverAColumn) {
        if (activeTask.columnId !== overId) {
          const updatedTask = { ...activeTask, columnId: overId };
          newTasks[activeIndex] = updatedTask;
          return newTasks;
        }
      }

      return tasks;
    });
  };

  const tasksByColumn = useMemo(() => {
    const grouped = {};
    for (const task of tasks) {
      if (!grouped[task.columnId]) {
        grouped[task.columnId] = [];
      }
      grouped[task.columnId].push(task);
    }
    return grouped;
  }, [tasks]);

  useEffect(() => {
    if (!showAddColumnButton && inputRef.current) {
      inputRef.current.querySelector("input")?.focus();
    }
  }, [showAddColumnButton]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    dispatch({ type: actions.SET_ACTIVE_TASK_SUCCESS, payload: {} });
    setOpenDrawer(false);
  };

  const handleCreateSectionBlur = () => {
    setNewColumnName("");
    setShowAddColumnButton(true);
  };

  useEffect(() => {
    if (activeTaskId) {
      handleDrawerOpen();
    }
  }, [activeTaskId]);

  return (
    <>
      <KanbanRightDrawer
        open={openDrawer}
        handleDrawer={handleDrawerClose}
        taskId={activeTaskId}
      />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetection={customCollisionDetection}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            overflowX: "auto",
            height: "100%",
          }}
        >
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                column={col}
                tasks={tasksByColumn[col.id] || []}
                activeColumnId={activeColumn?.id}
                setActiveTaskId={setActiveTaskId}
                handleDrawerOpen={handleDrawerOpen}
              />
            ))}
          </SortableContext>
          {showAddColumnButton ? (
            <Box height={"100%"} minWidth={336}>
              <MyButton
                variant="outlined"
                color="black"
                fullWidth={true}
                size="large"
                sx={{ borderColor: "#DBE0E4" }}
                hoverBgColor="whitesmoke"
                onClick={() => setShowAddColumnButton(false)}
                fontSize={isXs ? "13px" : isMd ? "14px" : "16px"}
              >
                Add Column
              </MyButton>
            </Box>
          ) : (
            <Box height={"100%"} sx={{minWidth:{xs:300,sm:336}}}>
              <MyTextField
                fullWidth={true}
                ref={inputRef}
                id="newColumnName"
                placeholder="Untitled"
                label=""
                fontWeight={700}
                borderColor="black"
                background={"white"}
                value={newColumnName}
                onChange={handleColumnInputfieldChange}
                onKeyDown={handleColumnInputKeyDown}
                onBlur={handleCreateSectionBlur}
                inputFontSize={isXs ? "13px" : isLg ? "14px" : "16px"}
                loading={loadingCreateColumn}
              />
              <Typography
                sx={{
                  color: "rgb(122,125,161)",
                  fontSize: "12px",
                  mt: 1,
                  ml: 1,
                }}
              >
                Press Enter to create the column.
              </Typography>
            </Box>
          )}
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <BoardColumn
                  isOverlay
                  column={activeColumn}
                  tasks={tasksByColumn[activeColumn.id] || []}
                />
              )}
              {activeTask && <TaskCard task={activeTask} isOverlay />}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </>
  );
}
