"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, IconButton, Chip } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function TaskCard({ task, isOverlay }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isOverlay ? 1 : isDragging ? 0.3 : 1,
    cursor: "grab",
    // border: isOverlay
    //   ? "2px solid #1976d2"
    //   : isDragging
    //   ? "2px solid rgba(0,0,0,0.2)"
    //   : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      // variant="outlined"
      sx={{
        width: "100%",
        boxShadow: "0 1px 2px 0 rgba(145 158 171 / 0.16)",
        backgroundColor: "#FFFFFF",
        outline: "none",
        borderRadius: "12px",
      }}
    >
      {/* <CardHeader
        sx={{
          px: 2,
          py: 1,
          borderBottom: "2px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
        }}
        avatar={
          <IconButton
            size="small"
            sx={{
              color: "rgba(0,0,0,0.4)",
              ml: -1,
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
        }
        action={
          <Chip label="Task" variant="outlined" sx={{ fontWeight: "bold" }} />
        }
      /> */}
      <CardContent
        sx={{
          padding: "20px 16px",
          whiteSpace: "pre-wrap",
          textAlign: "left",
          fontWeight: 600,
          fontSize: "14px",
          color: "#1C252E",
        }}
      >
        {task.content}
      </CardContent>
    </Card>
  );
}
