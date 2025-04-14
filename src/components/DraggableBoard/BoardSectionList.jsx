"use client";

import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  SortableContext,
  horizontalListSortingStrategy, // <-- for horizontal columns
} from "@dnd-kit/sortable";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";

import BoardSection from "./BoardSection";
import TaskItem from "./TaskItem";
import { findBoardSectionContainer, initializeBoard } from "./Board";
import { getTaskById } from "./tasks";
import SortableColumn from "./SortableColumn";
import { useAppContext } from "@/context/AppContext";
import useUpdateColumnPosition from "@/hooks/projects/section/useUpdateColumnPosition";
import useMoveTask from "@/hooks/projects/task/useMoveTask";
import MyButton from "../MyButton/MyButton";
import { Box, Typography } from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import useCreateSection from "@/hooks/projects/section/useCreateSection";

const BoardSectionList = () => {
  const { state } = useAppContext();
  const { activeProject } = state;
  const [showAddColumnButton, setShowAddColumnButton] = useState(true);
  const inputRef = useRef(null);
  console.log("::active project", activeProject);
  const [boardSections, setBoardSections] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [loadingUpdateTask, updateTask] = useMoveTask();
  const { loadingUpdatingColoumPos, updateColumnPosition } =
    useUpdateColumnPosition(activeProject?.id);
  const {
    loadingCreateColumn,
    errorCreateColumn,
    helperTextCreateColumn,
    newColumnName,
    handleColumnInputfieldChange,
    handleColumnInputKeyDown,
  } = useCreateSection(activeProject?.id, setShowAddColumnButton);

  useEffect(() => {
    if (!activeProject?.sections) return;

    const sectionMap = {};
    activeProject.sections.forEach((section) => {
      sectionMap[section?.id] = section.tasks || [];
    });

    const sorted = activeProject.sections
      .slice()
      .sort((a, b) => a.position - b.position);

    setBoardSections(sectionMap);
    setColumnOrder(sorted.map((s) => s.id));
  }, [activeProject]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [overTaskId, setOverTaskId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active?.id);
  };

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    const activeId = active?.id;

    console.log(":: over id in handle drag over", over?.id, overId);
    console.log(":: acitve id in handle drag over", active?.id, activeId);

    if (!overId || !activeId) return;

    // Try to find the overId in all tasks to determine if it's a task
    const isOverTask = Object.values(boardSections)
      .flat()
      .some((task) => task?.id === overId);
    const isOverBottom = overId.startsWith("bottom-");

    console.log("::is over task in handle drag", isOverTask);
    console.log("::is over bottom in handle drag", isOverBottom, overId);
    console.log(
      ":: all task ids",
      Object.values(boardSections)
        .flat()
        .map((t) => t.id)
    );

    if (isOverTask || isOverBottom) {
      setOverTaskId(overId);
    } else {
      setOverTaskId(null); // don't show preview when hovering over column only
    }
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active?.id
    );
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    console.log("::is over container in handle drag", overContainer);

    const isOverColumn = overId === overContainer;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.findIndex(
        (item) => item?.id === active?.id
      );
      const overIndex = boardSections[overContainer].findIndex(
        (item) => item?.id === over?.id
      );

      if (activeIndex === -1 || overIndex === -1) return prev;

      return {
        ...prev,
        [activeContainer]: activeItems.filter(
          (item) => item?.id !== active?.id
        ),
        [overContainer]: [
          ...overItems.slice(0, overIndex),
          activeItems[activeIndex],
          ...overItems.slice(overIndex),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTaskId(null);
    setOverTaskId(null);
    if (!over) return;

    const activeId = active?.id;
    const overId = over?.id;

    const isColumnDrag = columnOrder.includes(activeId);

    if (isColumnDrag && overId && columnOrder.includes(overId)) {
      const oldIndex = columnOrder.indexOf(activeId);
      const newIndex = columnOrder.indexOf(overId);
      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
        setColumnOrder(newOrder);
        updateColumnPosition(activeId, newIndex + 1, activeProject?.id);
      }
      return;
    }

    const activeContainer = findBoardSectionContainer(boardSections, activeId);
    const overContainer = findBoardSectionContainer(boardSections, overId);

    if (!activeContainer || !overContainer) return;

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task?.id === activeId
    );

    const activeTask = boardSections[activeContainer]?.[activeIndex];
    if (!activeTask) return;

    let insertIndex;
    if (overId.startsWith("bottom-")) {
      insertIndex = boardSections[overContainer].length;
    } else {
      const overIndex = boardSections[overContainer].findIndex(
        (task) => task?.id === overId
      );
      insertIndex =
        overIndex >= 0 ? overIndex : boardSections[overContainer].length;
    }

    if (activeContainer === overContainer) {
      const adjustedIndex =
        activeIndex < insertIndex ? insertIndex - 1 : insertIndex;

      setBoardSections((prev) => ({
        ...prev,
        [overContainer]: arrayMove(
          prev[overContainer],
          activeIndex,
          adjustedIndex
        ),
      }));
    } else {
      setBoardSections((prev) => {
        const newSource = prev[activeContainer].filter(
          (task) => task?.id !== activeId
        );
        const newTarget = [...prev[overContainer]];
        newTarget.splice(insertIndex, 0, activeTask);

        return {
          ...prev,
          [activeContainer]: newSource,
          [overContainer]: newTarget,
        };
      });
    }
    if (activeContainer !== overContainer || activeIndex !== insertIndex) {
      updateTask(activeTask.id, overContainer, insertIndex);
    }
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const allTasks = Object.values(boardSections).flat();
  const task = activeTaskId ? getTaskById(allTasks, activeTaskId) : null;

  useEffect(() => {
    if (!showAddColumnButton && inputRef.current) {
      inputRef.current.querySelector("input")?.focus();
    }
  }, [showAddColumnButton]);
  return (
    <Container sx={{ margin: 0 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={2} flexWrap={"nowrap"}>
          <SortableContext
            items={Object.keys(boardSections)}
            strategy={horizontalListSortingStrategy}
          >
            {columnOrder?.map((boardSectionKey) => {
              const sectionData = boardSections[boardSectionKey];
              const sectionLabel = activeProject?.sections?.find(
                (s) => s.id === boardSectionKey
              )?.name;
              return (
                <Grid
                  item
                  xs={3}
                  key={boardSectionKey}
                  minWidth={336}
                  sx={{ background: "#F4F6F8", borderRadius: "16px" }}
                >
                  <SortableColumn id={boardSectionKey}>
                    <BoardSection
                      id={boardSectionKey}
                      title={boardSectionKey}
                      tasks={boardSections[boardSectionKey]}
                      activeTaskId={activeTaskId}
                      overTaskId={overTaskId}
                      sectionLabel={sectionLabel}
                    />
                  </SortableColumn>
                </Grid>
              );
            })}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
          <Grid
            item
            xs={3}
            minWidth={336}
            sx={{ background: "#FFFFFF", borderRadius: "16px" }}
          >
            {showAddColumnButton ? (
              <Box>
                <MyButton
                  variant="outlined"
                  color="black"
                  fullWidth={true}
                  size="large"
                  sx={{ borderColor: "#DBE0E4" }}
                  hoverBgColor="whitesmoke"
                  onClick={() => setShowAddColumnButton(false)}
                >
                  Add Column
                </MyButton>
              </Box>
            ) : (
              <Box>
                <MyTextField
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
                  onBlur={() => setShowAddColumnButton(true)}
                  inputFontSize="18px"
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
          </Grid>
        </Grid>
      </DndContext>
    </Container>
  );
};

export default BoardSectionList;
