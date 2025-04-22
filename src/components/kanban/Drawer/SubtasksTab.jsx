const activeTask = {
  title: "Build New Feature",
  subtasks: [
    { id: 1, title: "Complete project proposal", completed: true },
    { id: 2, title: "Conduct market research", completed: true },
    { id: 3, title: "Design user interface mockups", completed: false },
    { id: 4, title: "Develop backend api", completed: false },
    { id: 5, title: "Implement authentication system", completed: false },
  ],
};

import {
  Box,
  Checkbox,
  Typography,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";

const SubTasksTab = ({}) => {
  const [subtasks, setSubtasks] = useState(activeTask.subtasks);
  const [loadingIds, setLoadingIds] = useState([]);

  const handleToggle = async (id, currentStatus) => {
    setLoadingIds((prev) => [...prev, id]);

    try {
      const response = await axios.patch(`/api/subtasks/${id}`, {
        completed: !currentStatus,
      });

      setSubtasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update subtask:", error);
      alert("Error updating subtask. Please try again.");
    } finally {
      setLoadingIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const completedCount = subtasks.filter((task) => task.completed).length;
  const totalCount = subtasks.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <Box p={2}>
      <Typography variant="body2" gutterBottom>
        {`${completedCount} of ${totalCount}`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 2, height: 8, borderRadius: 5 }}
      />

      <List>
        {subtasks.map((subtask) => (
          <ListItem key={subtask.id} disablePadding>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={subtask.completed}
                disabled={loadingIds.includes(subtask.id)}
                onChange={() => handleToggle(subtask.id, subtask.completed)}
              />
            </ListItemIcon>
            <ListItemText primary={subtask.title} />
          </ListItem>
        ))}
      </List>

      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        sx={{ mt: 2 }}
      >
        Subtask
      </Button>
    </Box>
  );
};

export default SubTasksTab;
