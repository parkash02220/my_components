"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";
import PriorityIcon from "./PriorityIcon";
import SubComments from "./SubComments";
import DueDatePopper from "./DueDatePopper";
import AssignedTo from "./AssignedTo";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";

export function TaskCard({ task, isOverlay }) {
  const taskData = task?.content;
  const theme = useTheme();
  const {isXs} = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
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
    <>
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        sx={{
          width: "100%",
          boxShadow: "0 1px 2px 0 rgba(145 158 171 / 0.16)",
          backgroundColor: "#FFFFFF",
          outline: "none",
          borderRadius: "12px",
        }}
      >
        <CardContent
          sx={{
            padding: "0px",
            paddingBottom: "0px !important",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontWeight: 600,
            fontSize: "14px",
            color: "#1C252E",
          }}
        >
          <Box className="taskCard__contentBox">
            {taskData?.images && taskData?.images?.length > 0 ? (
              <Box className="taskCard__imageBox" padding={"8px 8px 0px 8px"}>
                <img
                  src={taskData?.images[0]}
                  alt="card image"
                  style={{
                    width: "320px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    aspectRatio: 4 / 3,
                  }}
                />
              </Box>
            ) : null}
            <Box
              className="taskCard__dataBox"
              fontWeight={600}
              fontSize={fontSize}
              padding={"20px 16px"}
              position={"relative"}
            >
              {taskData?.priority && (
                <PriorityIcon priority={taskData?.priority} />
              )}

              <Box>
                <Typography
                  color={theme?.palette?.primary?.main}
                  fontWeight={600}
                  fontSize={fontSize}
                  whiteSpace={"pre-wrap"}
                  textAlign={"left"}
                >
                  {taskData?.title}
                </Typography>
              </Box>
              <Box
                className="taskCard__footer"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                mt={2}
                flexDirection={"column"}
                gap={1}
              >
                <Box
                  className="taskCard__footer--top"
                  display={"flex"}
                  flexDirection={"row-reverse"}
                  justifyContent={"flex-start"}
                  width={"100%"}
                >
                  <AssignedTo assigned_to={taskData?.assigned_to} />
                </Box>
                <Box
                  className="taskCard__footer--bottom"
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                >
                  {taskData?.subComments &&
                    taskData?.subComments?.length > 0 && (
                      <SubComments subComments={taskData?.subComments} />
                    )}
                  {taskData?.images && taskData?.images?.length > 0 && (
                    <Box display={"flex"} gap={"2px"}>
                      <Box width={16} height={16}>
                        <img
                          src="/taskCardAttachmentsIcon.svg"
                          alt="comments"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                      <Typography fontSize={12} color="#919EAB">
                        {taskData?.images?.length}
                      </Typography>
                    </Box>
                  )}
                  <DueDatePopper
                    taskStartDate={taskData?.due_start_date}
                    taskEndDate={taskData?.due_end_date}
                    taskId={task?.id}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
