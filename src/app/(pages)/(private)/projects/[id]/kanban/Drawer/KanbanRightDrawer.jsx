import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Header } from "./header";
import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";
import useGetTask from "@/hooks/projects/task/useGetTask";
import { useAppContext } from "@/context/AppContext";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";

function KanbanRightDrawer({ open, handleDrawer, taskId }) {
  const {isXs} = useBreakpointFlags();
  const { activeTask, loadingActiveTask, errorActiveTask, getTaskFromBackend } =
    useGetTask();
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
        width={isXs ? '100vw' : ''}
          open={open}
          header={
            !loadingActiveTask ? (
              <Header
                activeTask={activeTask}
                handleDrawer={handleRightDrawerClose}
              />
            ) : null
          }
          handleDrawer={handleRightDrawerClose}
          children={
            !loadingActiveTask ? (
              <Content
                tabValues={tabValues}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                activeTask={activeTask}
                loadingGetTask={loadingActiveTask}
                open={open}
              />
            ) : (
              <Box
                sx={{
                  minHeight: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/iosLoader.gif"
                  alt="loading"
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>
            )
          }
        />
      </Box>
    </>
  );
}

export default KanbanRightDrawer;
