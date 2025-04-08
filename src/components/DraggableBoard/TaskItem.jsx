import React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

const TaskItem = ({ task }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={task.image} />
            <Box>
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
