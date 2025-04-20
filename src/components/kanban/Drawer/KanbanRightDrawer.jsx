import { useState } from "react";
import { Content } from "./Content";
import { Header } from "./header";
import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";

function KanbanRightDrawer({ open, handleDrawer }) {
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
      value: "Comments (0)",
      label: "comments",
    },
  ];
  const [currentTab, setCurrentTab] = useState("overview");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <>
      <Box>
        <RightDrawer
          open={open}
          header={<Header />}
          handleDrawer={handleDrawer}
          children={
            <Content
              tabValues={tabValues}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            />
          }
        />
      </Box>
    </>
  );
}

export default KanbanRightDrawer;
