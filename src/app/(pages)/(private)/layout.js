"use client";

import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useGetActiveUser from "@/hooks/user/activeUser/useGetActiveUser";
import Loader from "@/components/Loader/Loader";
import { NotificationsContextProvider } from "@/context/Notifications/NotificationsContext";
import { ProjectsContextProvider } from "@/context/Projects/ProjectsContex";
import { TaskContextProvider } from "@/context/Task/TaskContext";
import { ChatContextProvider } from "@/context/Chat/ChatContext";

export default function HomeLayout({ children }) {
  const { isMd } = useBreakpointFlags();
  const [open, setOpen] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
    const { loadingActiveUser } = useGetActiveUser();
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
   
  if(loadingActiveUser){
   return <Box height={'100vh'}>
  <Loader />
  </Box>
  }
  return (
    <NotificationsContextProvider>
      <ProjectsContextProvider>
        <TaskContextProvider>
        <ChatContextProvider>
      <Box sx={{ display: "flex" }} className="privateLayout__container">
        <MySideDrawer open={open} setOpen={setOpen} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={
            isMd ? "100%" : open ? "calc(100% - 300px)" : "calc(100% - 88px)"
          }
          position={"relative"}
          height={"100vh"}
        >
          <Header />
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              minHeight: 0, // 🧠 KEY: allows children to shrink
              padding: isMd ? "24px 16px 8px 16px" : "24px",
              paddingBottom: "4px",
            }}
          >
            {children}
          </main>
      </Box>
      </Box>
      </ChatContextProvider>
      </TaskContextProvider>
      </ProjectsContextProvider>
      </NotificationsContextProvider>
  );
}
