"use client";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TaskCard } from "../Task";
import ColumnHeader from "./Header";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

function BoardColumnComponent({
  column,
  tasks,
  isOverlay,
  activeColumnId,
  handleDrawerOpen,
  setActiveTaskId,
}) {
  const { isXs } = useResponsiveBreakpoints();
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

  return (
    <>
      <Paper
        ref={setNodeRef}
        elevation={isOverlay ? 6 : 3}
        style={{
          height: "100%",
          width: isXs ? 300 : 336,
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
        <ColumnHeader
          tasks={tasks}
          column={column}
          attributes={attributes}
          listeners={listeners}
        />

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
            <SortableContext
              items={taskIds}
              strategy={verticalListSortingStrategy}
            >
              {tasks?.length < 1 ? (
                <Box
                  className="emptySection"
                  height={"inherit"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="disabled"
                    textAlign={"center"}
                    fontWeight={"600"}
                  >
                    Looks like this section is empty. Let's add some tasks!
                  </Typography>
                </Box>
              ) : (
                tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    setActiveTaskId={setActiveTaskId}
                    handleDrawerOpen={handleDrawerOpen}
                  />
                ))
              )}
            </SortableContext>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export const BoardColumn = React.memo(BoardColumnComponent);
