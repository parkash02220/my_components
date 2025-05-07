import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import useNotifications from "@/hooks/notifications/useNotifications";
import { useAppContext } from "@/context/AppContext";

const index = ({ open, handleDrawer,notifications,loadingNotifications,totalCount,unReadCount,loadMoreRef,hasMore }) => {
  console.log("::notifications",notifications)
  const { dispatch } = useAppContext();
  const tabValues = [
    {
      key: 1,
      value: "all",
      label: "All",
    },
    {
      key: 2,
      value: "unread",
      label: "Unread",
    },
  ];
  const [currentTab, setCurrentTab] = useState("all");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleRightDrawerClose = () => {
    handleDrawer();
    setTimeout(() => {
      setCurrentTab("all");
    }, 0);
  };

  useEffect(() => {
    dispatch({ type: "SET_NOTIFICATION_TAB", payload: { tab: currentTab } });
  }, [currentTab]);

  return (
    <>
      <Box>
        <RightDrawer
          open={open}
          width={420}
          overflowY={"hidden"}
          noFooterBorderTop
          header={<Header handleDrawer={handleRightDrawerClose} />}
          handleDrawer={handleRightDrawerClose}
          children={
            <Content
              tabValues={tabValues}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
              open={open}
              notifications={notifications}
              loadingNotifications={loadingNotifications}
              totalCount={totalCount}
              unReadCount={unReadCount}
              loadMoreRef={loadMoreRef}
              hasMore={hasMore}
            />
          }
          footer={<Footer />}
        />
      </Box>
    </>
  );
};

export default index;
