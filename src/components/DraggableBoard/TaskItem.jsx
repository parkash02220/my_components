import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const TaskItem = ({ task, isGhost = false }) => {
  return (
    <Card
      sx={{
        opacity: isGhost ? 0.5 : 1,
        boxShadow: isGhost ? "0 0 0 2px #999" : "0 1px 2px 0 rgba(145 158 171 / 0.16)",
        backgroundColor: isGhost ? "#f7f7f7" : "#fff",
        borderRadius: 2,
        fontWeight:600,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} flexDirection={'column'}>
          <Avatar src={task.image} />
          <Box sx={{ padding:'20px 16px',width:'100%'}}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {task.time}
            </Typography>
            <Typography variant="body2">{task.description}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
