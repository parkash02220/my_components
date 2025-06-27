import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Header } from "./header";
import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";
import useGetTask from "@/hooks/projects/task/useGetTask";
import { useRouter, useSearchParams } from "next/navigation";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

function KanbanRightDrawer({ open, handleDrawer, taskId }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");
  const { isDownXs } = useResponsiveBreakpoints();
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
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", newValue);
    router.push(`?${current.toString()}`);
  };

  useEffect(() => {
    if (open && taskId) {
      getTaskFromBackend(taskId);
    }
  }, [open, taskId]);

  const handleRightDrawerClose = () => {
    handleDrawer();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("tab");
    router.replace(`?${current.toString()}`);

    setTimeout(() => {
      setCurrentTab("overview");
    }, 0);
  };

  useEffect(() => {
    if (!open) return;
    if (tab === "overview" || tab === "subtasks" || tab === "comments") {
      setCurrentTab(tab);
    }
  }, [tab, open]);

  useEffect(() => {
    if (!open) return;
    if (!tab) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("tab", "overview");
      router.replace(`?${current.toString()}`);
    }
  }, [open]);
  return (
    <>
      <Box>
        <RightDrawer
          width={isDownXs ? "100vw" : ""}
          open={open}
          showCloseDrawerMobileIcon={false}
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
