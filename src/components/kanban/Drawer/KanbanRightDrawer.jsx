import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Header } from "./header";
import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";
import useGetTask from "@/hooks/projects/task/useGetTask";
import { useAppContext } from "@/context/AppContext";

function KanbanRightDrawer({ open, handleDrawer, taskId }) {
  const { getTaskFromBackend } = useGetTask();
  const { state } = useAppContext();
  const { activeTask, loading } = state;
  const loadingGetTask = loading.activeTask;
  const tabValues = [
    {
      key: 1,
      value: "overview",
      label: "Overview",
    },
    {
      key: 2,
      value: "subtasks",
      label: "Subtasks",
    },
    {
      key: 3,
      value: "comments",
      label: "Comments",
    },
  ];
  const [currentTab, setCurrentTab] = useState("overview");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (open && taskId) {
      getTaskFromBackend(taskId);
    }
  }, [open, taskId]);

  const handleRightDrawerClose = () => {
    handleDrawer();
    setTimeout(() => {
      setCurrentTab("overview");
    }, 0);
  };
  return (
    <>
      <Box>
        <RightDrawer
          open={open}
          header={
            <Header
              activeTask={activeTask}
              handleDrawer={handleRightDrawerClose}
            />
          }
          handleDrawer={handleRightDrawerClose}
          children={
            <Content
              tabValues={tabValues}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
              activeTask={activeTask}
              loadingGetTask={loadingGetTask}
              open={open}
            />
          }
        />
      </Box>
    </>
  );
}

export default KanbanRightDrawer;
