import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewTab from "./OverviewTab";
import SubTasksTab from "./SubtasksTab";
import CommentsTab from "./CommentsTab";
export const Content = ({
  currentTab,
  tabValues,
  handleTabChange,
  activeTask,
  loadingGetTask,
  open
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




  useEffect(() => {
    const currentNode = tabsRef.current[currentIndex];
    const prevNode = tabsRef.current[prevIndex];
  
    if (currentNode && prevNode) {
      const { offsetLeft: currentLeft, offsetWidth: currentWidth } = currentNode;
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
    if (!loadingGetTask && open) {
      const currentNode = tabsRef.current[currentIndex];
      if (currentNode) {
        const { offsetLeft, offsetWidth } = currentNode;
        setTargetStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [loadingGetTask, open]);


const getContentForCurrentTab = (tab) => {
  if(tab==="subtasks"){
    return  <SubTasksTab  activeTask={activeTask}/>
  }else if(tab==="comments"){
    return  <CommentsTab  activeTask={activeTask}/>
  }else{
    return  <OverviewTab  activeTask={activeTask}/>
  }
}
console.log("::active task in conetnt",activeTask)
useEffect(()=> {
  console.log("::this is first rendor")
},[])
  return (
    <>
   {
     !loadingGetTask ? (
      <Box>
        <Box
          sx={{ width: "100%", background: "#F4F6F8" }}
          className="editTask_tabs"
          padding={1}
        >
          <Box sx={{ position: "relative" }} ref={containerRef}>
            <motion.div
              key={motionKey}
              initial={
                shouldAnimate
                  ? { left: prevStyle.left, width: targetStyle.width, opacity: 0.5 }
                  : false
              }
              animate={{
                left: targetStyle.left,
                width: targetStyle.width,
                opacity: 1,
              }}
              transition={{ duration: shouldAnimate ? 0.4 : 0, ease: "easeInOut" }}
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
                  value={ tab?.value}
                  label={ tab?.value !== "comments" ? tab?.label : `${tab?.label} (${activeTask?.subComments?.length || 0})`}
                  sx={{
                    color: "#637381 !important",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "none",
                    padding: "8px 0px",
                    borderRadius: "8px",
                    margin: "0px",
                    zIndex: 1,
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
        {getContentForCurrentTab(currentTab)}
      </Box>
     ) : (
      <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={'100%'}
    >
      <img src="/iosLoader.gif" width={"40px"} height={"40px"} />
    </Box>
     )
   }
    </>
  );
};

