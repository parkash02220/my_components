import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchivedTab from "@/components/Header/NotificationDrawer/ArchivedTab";
import UnReadTab from "@/components/Header/NotificationDrawer/UnReadTab";
import AllTab from "@/components/Header/NotificationDrawer/AllTab";
export const Content = ({ currentTab, tabValues, handleTabChange, open,notificationCount,notifications,loadingNotifications }) => {
  const containerRef = useRef(null);
  const [targetStyle, setTargetStyle] = useState({ left: 0, width: 0 });
  const [prevStyle, setPrevStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);
  const [motionKey, setMotionKey] = useState(currentTab);
  const [prevTab, setPrevTab] = useState(currentTab);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const currentIndex = tabValues.findIndex((tab) => tab.value === currentTab);
  const prevIndex = tabValues.findIndex((tab) => tab.value === prevTab);

  useEffect(() => {
    const currentNode = tabsRef.current[currentIndex];
    const prevNode = tabsRef.current[prevIndex];

    if (currentNode && prevNode) {
      const { offsetLeft: currentLeft, offsetWidth: currentWidth } =
        currentNode;
      const { offsetLeft: prevLeft } = prevNode;

      setPrevStyle({ left: prevLeft });
      setTargetStyle({ left: currentLeft, width: currentWidth });

      if (prevTab !== currentTab) {
        setShouldAnimate(true);
        setMotionKey(currentTab);
      } else {
        setShouldAnimate(false);
      }

      setPrevTab(currentTab);
    }
  }, [currentTab]);

  //   useEffect(() => {
  //     if (!loadingGetTask && open) {
  //       const currentNode = tabsRef.current[currentIndex];
  //       if (currentNode) {
  //         const { offsetLeft, offsetWidth } = currentNode;
  //         setTargetStyle({ left: offsetLeft, width: offsetWidth });
  //       }
  //     }
  //   }, [loadingGetTask, open]);

  const getContentForCurrentTab = (tab) => {
    if (tab === "unread") {
      return <UnReadTab notifications={notifications} loadingNotifications={loadingNotifications}/>;
    } else {
      return <AllTab notifications={notifications} loadingNotifications={loadingNotifications}/>;
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"calc(100vh - 132px)"}
      >
        <Box
          sx={{ width: "100%", background: "#F4F6F8" }}
          className="notifications_tabs"
          padding={1}
        >
          <Box
            sx={{ position: "relative", maxHeight: "40px" }}
            ref={containerRef}
          >
            <motion.div
              key={motionKey}
              initial={
                shouldAnimate
                  ? {
                      left: prevStyle.left,
                      width: targetStyle.width,
                      opacity: 0.5,
                    }
                  : false
              }
              animate={{
                left: targetStyle.left,
                width: targetStyle.width,
                opacity: 1,
              }}
              transition={{
                duration: shouldAnimate ? 0.4 : 0,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                height: "100%",
                top: 0,
                background: "#fff",
                borderRadius: "8px",
                zIndex: 0,
              }}
            />

            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                background: "#F4F6F8",
              }}
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
            >
              {tabValues.map((tab, index) => (
                <Tab
                  disableRipple
                  key={tab?.key}
                  value={tab?.value}
                  label={
                    <Box display="flex" alignItems="center">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: currentTab === tab?.value ? 600 : 500,
                          color:
                            currentTab === tab?.value ? "#1C252E" : "#637381",
                        }}
                      >
                        {tab.label}
                      </Typography>
                      <Typography
                        sx={{
                          height: "24px",
                          minWidth: "24px",
                          flexShrink: 0,
                          cursor: "default",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color:
                            tab?.value === currentTab
                              ? "#FFFFFF"
                              : tab?.value === "all"
                              ? "#FFFFFF"
                              : "#006C9C",
                          background:
                            tab?.value === "all"
                              ? "#1C252E"
                              : tab?.value === currentTab
                              ? "#00B8D9"
                              : "rgba(0,184,217,0.16)",
                          whiteSpace: "nowrap",
                          padding: "0px 6px",
                          borderRadius: "6px",
                          ml: 1,
                        }}
                      >
                        {notificationCount}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    textTransform: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    margin: "0px",
                    zIndex: 1,
                    minWidth: "48px",
                    minHeight: "40px",
                    transition: "color 0.3s ease",
                    "&.Mui-selected": {
                      color: "#1C252E !important",
                    },
                  }}
                  ref={(el) => (tabsRef.current[index] = el)}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {getContentForCurrentTab(currentTab)}
        </Box>
      </Box>
    </>
  );
};
