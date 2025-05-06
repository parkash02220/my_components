import RightDrawer from "@/components/RightDrawer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import useNotifications from "@/hooks/common/useNotifications";
import { useAppContext } from "@/context/AppContext";

const index = ({open, handleDrawer}) => {
  const {dispatch} = useAppContext();
  const {
    notifications,
    loadingNotifications,
    errorNotifications,
    fetchNotifications
} = useNotifications(open);
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
    

      useEffect(()=>{
           dispatch({type:"SET_NOTIFICATION_TAB",payload:{tab:currentTab}});
      },[currentTab]);


    return <>
      <Box>
        <RightDrawer
          open={open}
          width={420}
          overflowY={'hidden'}
          noFooterBorderTop
          header={
            (
              <Header
                handleDrawer={handleRightDrawerClose}
              />
            )
          }
          handleDrawer={handleRightDrawerClose}
          children={
            (
              <Content
                tabValues={tabValues}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                open={open}
                notificationCount={notifications?.length || 0}
                notifications={notifications}
                loadingNotifications={loadingNotifications}
              />
            )
          }
          footer={
            (
                <Footer />
            )
          }
        />
      </Box>
    </>
}

export default index;