import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificatoinMsg from "./NotificatoinMsg";
import useReadNotification from "@/hooks/notifications/useReadNotifications";
export const Content = ({
  currentTab,
  tabValues,
  handleTabChange,
  open,
  notifications,
  loadingNotifications,
  totalCount,
  unReadCount,
  loadMoreRef,
  hasMore,
  page,
}) => {
  const containerRef = useRef(null);
  const [targetStyle, setTargetStyle] = useState({ left: 0, width: 0 });
  const [prevStyle, setPrevStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);
  const [motionKey, setMotionKey] = useState(currentTab);
  const [prevTab, setPrevTab] = useState(currentTab);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const currentIndex = tabValues.findIndex((tab) => tab.value === currentTab);
  const prevIndex = tabValues.findIndex((tab) => tab.value === prevTab);
  const [visibleTab, setVisibleTab] = useState(currentTab);
  const scrollContainerRef = useRef(null);
  const {loadingReadNotification,errorReadNotification,markNotificationAsRead} = useReadNotification();
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

  useEffect(() => {
    if (!loadingNotifications && open) {
      const currentNode = tabsRef.current[currentIndex];
      if (currentNode) {
        const { offsetLeft, offsetWidth } = currentNode;
        setTargetStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [loadingNotifications, open]);

  useEffect(() => {
    if (currentTab !== visibleTab) {
      const timer = setTimeout(() => {
        setVisibleTab(currentTab);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentTab, visibleTab]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentTab]);

  const handleNotificationClick =async (isUnread,id) => {
    if(!isUnread) return;
    await markNotificationAsRead(id);
  }
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
                        {(tab?.value === "all" ? totalCount : unReadCount) || 0}
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
        ref={scrollContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            className="notifications__container"
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {(loadingNotifications ||
              currentTab !== visibleTab ||
              !notifications) &&
            (page === 0 || notifications?.length < 1) ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <img
                  src="/iosLoader.gif"
                  alt="loading"
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>
            ) : notifications.length > 0 ? (
              <Box>
                {notifications.map((notification, i) => (
                  <Box key={i} width="100%">
                    <NotificatoinMsg notification={notification} handleNotificationClick={handleNotificationClick}/>
                  </Box>
                ))}
                {loadingNotifications && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                      mt: "4px",
                    }}
                  >
                    <img
                      src="/iosLoader.gif"
                      alt="loading"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Box>
                )}
                {hasMore &&  !loadingNotifications && (
                  <Box
                    ref={loadMoreRef}
                    sx={{ height: "10px",background:"red" }}
                  ></Box>
                )}
              </Box>
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
              >
                <Box>
                  <Typography
                    fontSize={20}
                    fontWeight={600}
                    color="#1C252E"
                    textAlign={"center"}
                  >
                    You're all caught up!
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontSize={14}
                    color="#637381"
                    textAlign={"center"}
                  >
                    No notifications at the moment — we'll let you know when
                    something new comes in.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
