"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Chip,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RightDrawer from "../RightDrawer";
import MyTooltip from "../MyTooltip/MyTooltip";
import { getFullName } from "@/utils";

export function TaskCard({ task, isOverlay }) {
  const priorityList = [
    { label: "Low", value: "low", icon: "/lowPriorityIcon.svg" },
    { label: "Medium", value: "medium", icon: "/meduimPriorityIcon.svg" },
    { label: "High", value: "high", icon: "/highPriorityIcon.svg" },
  ];

  const getPriorityIcon = (priority) => {
    const match = priorityList.find((p) => p.value === priority);
    return match ? match.icon : null;
  };

  const taskData = task?.content;
  const theme = useTheme();
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
              fontSize={14}
              padding={"20px 16px"}
              position={"relative"}
            >
              {taskData?.priority && (
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    color: "red",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={getPriorityIcon(taskData?.priority)}
                    alt="priority"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              )}

              <Box>
                <Typography
                  color={theme?.palette?.primary?.main}
                  fontWeight={600}
                  fontSize={"14px"}
                  whiteSpace={"pre-wrap"}
                  textAlign={"left"}
                >
                  {taskData?.title}
                </Typography>
              </Box>
              <Box
                className="taskCard__footer"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={2}
              >
                <Box
                  className="taskCard__footer--left"
                  display={"flex"}
                  gap={1}
                >
                  {taskData?.subComments &&
                  taskData?.subComments?.length > 0 ? (
                    <Box display={"flex"} gap={"2px"}>
                      <Box width={16} height={16}>
                        <img
                          src="/taskCardCommentIcon.svg"
                          alt="comments"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                      <Typography fontSize={12} color="#919EAB">
                        {taskData?.subComments?.length}
                      </Typography>
                    </Box>
                  ) : null}
                  {taskData?.images && taskData?.images?.length > 0 ? (
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
                  ) : null}
                </Box>
                <Box
                  className="taskCard__footer--right"
                  display={"flex"}
                  flexDirection={"row-reverse"}
                  justifyContent={"flex-end"}
                >
                  {taskData?.assigned_to?.length > 4 && (
                    <MyTooltip
                      content={
                        <Box sx={{
                          display:'flex',
                          flexDirection:'column',
                          gap:1,
                          padding:1,
                        }}>
                          {taskData.assigned_to.map((user, index) => {
                            const name = getFullName(user?.firstName,user?.lastName);
                            return  (
                              <Box
                                key={index}
                                display="flex"
                                alignItems="center"
                                gap={1}
                              >
                                <img
                                  src={user.avatar}
                                  alt={name}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                                <Typography fontSize={12} fontWeight={500} color="white">{name}</Typography>
                              </Box>
                            )
                          })}
                        </Box>
                      }
                    >
                      <Box
                        fontSize={12}
                        color={"#007867"}
                        width={24}
                        height={24}
                        fontWeight={600}
                        ml={"-8px"}
                        position={"relative"}
                        boxSizing={"content-box"}
                        border={"2px solid #FFFFFF"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"50%"}
                        overflow={"hidden"}
                        sx={{
                          background:"#C8FAD6"
                        }}
                      >
                        +{taskData?.assigned_to?.length - 3}
                      </Box>
                    </MyTooltip>
                  )}
                  <Box display={'flex'}>
                  {taskData?.assigned_to?.length > 0 &&
                    taskData?.assigned_to
                      ?.slice(0, taskData?.assigned_to?.length > 4 ? 3 : 4)
                      ?.map((item, index) => {
                        const name = `${item?.firstName || ""} ${
                          item?.lastName || ""
                        }`;
                        return (
                          <MyTooltip
                            key={index}
                            title={name}
                            placement="bottom"
                          >
                            <Box
                              width={24}
                              height={24}
                              fontSize={16}
                              fontWeight={600}
                              border={"2px solid #FFFFFF"}
                              boxSizing={"content-box"}
                              ml={"-8px"}
                              position={"relative"}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              borderRadius={"50%"}
                              overflow={"hidden"}
                            >
                              <img
                                src={item?.avatar}
                                alt="avatar"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  color: "transparent",
                                  textIndent: "100000px",
                                  maxWidth: "100%",
                                }}
                              />
                            </Box>
                          </MyTooltip>
                        );
                      })}
                      </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
