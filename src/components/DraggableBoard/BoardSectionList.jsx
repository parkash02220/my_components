"use client";

import React, { useState } from "react";
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
import { INITIAL_TASKS } from "./initialData";
import { findBoardSectionContainer, initializeBoard } from "./Board";
import { getTaskById } from "./tasks";
import SortableColumn from "./SortableColumn";

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoardSections] = useState(initialBoardSections);
  const [columnOrder, setColumnOrder] = useState(
    Object.keys(initialBoardSections)
  );
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

    if (!overId || !activeId) return;

    // Try to find the overId in all tasks to determine if it's a task
    const isOverTask = Object.values(boardSections)
      .flat()
      .some((task) => task?.id === overId);

    if (isOverTask) {
      setOverTaskId(overId);
    } else {
      setOverTaskId(null); // don't show preview when hovering over column only
    }
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active?.id
    );
    const overContainer = findBoardSectionContainer(boardSections, over?.id);


    const isOverColumn = overId === overContainer;
    console.log("::is over coloumn",isOverColumn)

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
    const isColumnDrag = columnOrder.includes(active?.id);
    setActiveTaskId(null);
    setOverTaskId(null);
    if (!over) return;

    // Reorder columns
    if (columnOrder.includes(active?.id) && columnOrder.includes(over?.id)) {
      const oldIndex = columnOrder.indexOf(active?.id);
      const newIndex = columnOrder.indexOf(over?.id);

      if (oldIndex !== newIndex) {
        setColumnOrder((prev) => arrayMove(prev, oldIndex, newIndex));
      }
      return;
    }
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active?.id
    );
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      setActiveTaskId(null);
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task?.id === active?.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task?.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;
  console.log("::overid in section list", overTaskId);
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
            {columnOrder.map((boardSectionKey) => (
              <Grid
                item
                xs={3}
                key={boardSectionKey}
                minWidth={336}
                sx={{ background: "#F4F6F8", borderRadius: "16px" }}
              >
                <SortableColumn key={boardSectionKey} id={boardSectionKey}>
                  <BoardSection
                    id={boardSectionKey}
                    title={boardSectionKey}
                    tasks={boardSections[boardSectionKey]}
                    activeTaskId={activeTaskId}
                    overTaskId={overTaskId}
                  />
                </SortableColumn>
              </Grid>
            ))}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </Grid>
      </DndContext>
    </Container>
  );
};

export default BoardSectionList;
