import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOARD_SECTIONS } from "./initialData";
const BoardSection = ({ id, title, tasks,activeTaskId,overTaskId }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  const bottomPlaceholderId = `bottom-${id}`;
  const { setNodeRef: setBottomPlaceholderRef } = useDroppable({
    id: bottomPlaceholderId,
  });
  const isDragging = !!activeTaskId;
  const activeTask = tasks.find((t) => t?.id === activeTaskId);
  
  // Filter out active task (so it doesn't leave a gap)
  let filteredTasks = tasks;
  if (isDragging) {
    filteredTasks = tasks.filter((task) => task?.id !== activeTaskId);
  }

  // Insert ghost preview
  const ghostIndex =
  filteredTasks.findIndex((task) => task?.id === overTaskId) !== -1
    ? filteredTasks.findIndex((task) => task?.id === overTaskId)
    : filteredTasks.length;
  const enhancedTasks = [...filteredTasks];

  if (isDragging && ghostIndex !== -1 && activeTask) {
    enhancedTasks.splice(ghostIndex, 0, {
      ...activeTask,
      id: `ghost-${activeTask?.id}${Date.now()}`,
      isGhost: true,
    });
  }
  return (
    <Box sx={{ backgroundColor: "#eee", padding: 2,borderRadius:2 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1} mb={2} mr={4}>
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Typography sx={{
          background:'#E4E8EB',
          color:"black",
          borderRadius:'50%',
          fontWeight:700,
          fontSize:'12px',
        }}>
       {tasks?.length || 0}
      </Typography>
      <Typography padding={'4px 0px 5px'} fontWeight={600} fontSize={'18px'}>
        {BOARD_SECTIONS[title]}
      </Typography>
        </Box>
        <Box>
          <IconButton
          sx={{
            background:'black',
            color:'white',
            padding:'0px',
            width:'20px',
            height:"20px",
          }}
          >
          <AddIcon sx={{height:'20px'}}/>
          </IconButton>
        </Box>
      </Box>
       
      <SortableContext
        id={id}
        items={[...filteredTasks.map((t) => t?.id), bottomPlaceholderId]} 
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
        {enhancedTasks
  .filter((task) => task && task.id)
  .map((task) => {
            if (!task) return null;

            const isGhost = task.isGhost;

            return (
              <React.Fragment key={task?.id}>
                <Box sx={{ mb: 2, opacity: isGhost ? 0.5 : 1 }}>
                  {isGhost ? (
                    <TaskItem task={task} isGhost />
                  ) : (
                    <SortableTaskItem id={task?.id}>
                      <TaskItem task={task} />
                    </SortableTaskItem>
                  )}
                </Box>
              </React.Fragment>
            );
          })}
         <div
  ref={setBottomPlaceholderRef}
  style={{
    height: '10px',
    marginTop: '1px',
  }}
></div>
        </div>
      </SortableContext>
    </Box>
  );
};

export default BoardSection;