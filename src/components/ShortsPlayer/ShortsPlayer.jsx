import React, { useState, useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { Box, Tooltip } from "@mui/material";
import ShortsCard from "./ShortsCard";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const defaultContainerStyles = {
  width: "100%",
  backgroundColor: "#000",
  sx: {},
};
const defaultMotionCardStyles = {
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0F0F0F",
  sx: {},
};
const defaultNavBtnContainerStyles = {
  width: "200px",
  height: "100%",
  flexDirection: "column",
  gap: "16px",
  justifyContent: "center",
  alignItems: "end",
  padding: "16px",
  sx: {},
};
const defaultNavBtnStyles = {
  width: "56px",
  height: "56px",
  bgcolor: "rgb(39,39,39)",
  borderRadius: "50%",
  hoverBgColor: "rgba(128, 128, 128, 0.5)",
  iconColor: "white",
  iconSize: "1.5rem",
  sx: {},
};
const defaultCardStyles = {
  width: { xs: "100%", sm: "500px", md: "600px" },
  height: "calc(100% - 24px)",
  bgColor: "#0f0f0f",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "white",
  border: "1px solid #0f0f0f",
  sx: {},
};
const defaultCardLeftBoxStyles = {
  flexDirection: "column",
  justifyContent: "flex-end",
  bgcolor: "transparent",
  padding: "16px",
  gap: "8px",
  borderRadius: "20px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
  ml: { xs: "20px", md: "0px" },
  sx: {},
};
const defaultVideoBoxStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "20px",
  sx: {},
};
const defaultMyLogoStyles = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "white",
  iconColor: "red",
  iconSize: "2rem",
  sx: {},
};
const defaultMyTitleStyles = {
  fontSize: "14px",
  color: "white",
  sx: {},
};
const defaultSubscribeBtnStyles = {
  color: "black",
  background: "white",
  fontWeight: 700,
  height: "32px",
  textTransform: "none",
  fontSize: "12px",
  hoverBackground: "rgba(255,255,255,0.75)",
  sx: {},
};
const defaultShortTitleStyles = {
  fontWeight: "bold",
  color: "white",
  fontSize: "16px",
  sx: {},
};
const defaultShortDesStyles = {
  variant: "body2",
  color: "white",
  fontSize: "16px",
  sx: {},
};
const defaultCardRightBoxStyles = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  p: "12px 12px 0px",
  bgcolor: "#0f0f0f",
  gap: "16px",
  width: { xs: "60px", sm: "72px" },
  sx: {},
};
const defaultCardBtnBoxStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  sx: {},
};
const defaultCardIconStyles = {
  bgcolor: "rgb(39,39,39)",
  hoverBgColor: "rgba(128, 128, 128, 0.5)",
  color: "white",
  width: { xs: "40px", sm: "48px" },
  height: { xs: "40px", sm: "48px" },
  sx: {},
};
const defaultCardIconbtnLogoStyles = {
  width: { xs: "32px", sm: "40px" },
  height: { xs: "32px", sm: "40px" },
  borderRadius: "6px",
  background: "white",
  iconSize: "2rem",
  color: "red",
  sx: {},
};
const defaultLoadingBoxStyles = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "black",
  padding: "16px",
  borderRadius: "20px",
  color: "white",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
  sx: {},
};
const ShortsPlayer = ({
  items,
  actions,
  containerStyles,
  motionCardStyles,
  navBtnContainerStyles,
  navBtnStyles,
  tooltipTitle_navBtnUp = "Previous video",
  tooltipPlacement_navBtnUp = "left",
  tooltipTitle_navBtnDown = "Next video",
  tooltipPlacement_navBtnDown = "left",
  cardStyles,
  cardLeftBoxStyles,
  videoBoxStyles,
  myLogoStyles,
  myTitleStyles,
  subscribeBtnStyles,
  shortTitleStyles,
  shortDesStyles,
  cardRightBoxStyles,
  cardBtnBoxStyles,
  tooltipTitle_likeBtn = "I like this",
  tooltipPlacement_likeBtn = "left",
  tooltipTitle_dislikeBtn = "I dislike this",
  tooltipPlacement_dislikeBtn = "left",
  tooltipTitle_viewsBtn = "Views",
  tooltipPlacement_viewsBtn = "left",
  tooltipTitle_shareBtn = "Share",
  tooltipPlacement_shareBtn = "left",
  cardIconStyles,
  cardIconbtnLogoStyles,
  loadingBoxStyles,
  loading = false,
}) => {
  const mergedContainerStyles = {
    ...defaultContainerStyles,
    ...containerStyles,
  };
  const mergedMotionCardStyles = {
    ...defaultMotionCardStyles,
    ...motionCardStyles,
  };
  const mergedNavBtnContainerStyles = {
    ...defaultNavBtnContainerStyles,
    ...navBtnContainerStyles,
  };
  const mergedNavBtnStyles = { ...defaultNavBtnStyles, ...navBtnStyles };
  const mergedCardStyles = { ...defaultCardStyles, ...cardStyles };
  const mergedCardLeftBoxStyles = {
    ...defaultCardLeftBoxStyles,
    ...cardLeftBoxStyles,
  };
  const mergedVideoBoxStyles = { ...defaultVideoBoxStyles, ...videoBoxStyles };
  const mergedMyLogoStyles = { ...defaultMyLogoStyles, ...myLogoStyles };
  const mergedMyTitleStyles = { ...defaultMyTitleStyles, ...myTitleStyles };
  const mergedSubscribeBtnStyles = {
    ...defaultSubscribeBtnStyles,
    ...subscribeBtnStyles,
  };
  const mergedShortTitleStyles = {
    ...defaultShortTitleStyles,
    ...shortTitleStyles,
  };
  const mergedShortDesStyles = { ...defaultShortDesStyles, ...shortDesStyles };
  const mergedCardRightBoxStyles = {
    ...defaultCardRightBoxStyles,
    ...cardRightBoxStyles,
  };
  const mergedCardBtnBoxStyles = {
    ...defaultCardBtnBoxStyles,
    ...cardBtnBoxStyles,
  };
  const mergedCardIconStyles = { ...defaultCardIconStyles, ...cardIconStyles };
  const mergedCardIconbtnLogoStyles = {
    ...defaultCardIconbtnLogoStyles,
    ...cardIconbtnLogoStyles,
  };
  const mergedLoadingBoxStyles = {
    ...defaultLoadingBoxStyles,
    ...loadingBoxStyles,
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(null);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  const scrollStartTime = useRef(null);
  const scrollTimeout = useRef(null);

  const getAvailableHeight = () => {
    if (typeof window === "undefined") return 0;
    const parentHeight = containerRef.current?.clientHeight;
    return parentHeight && parentHeight > 0 ? parentHeight : window.innerHeight;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateHeight = () => {
        console.log("::entering update height");
        const parentHeight = containerRef.current?.clientHeight;
        console.log(
          "::parent height",
          parentHeight,
          containerRef.current?.clientHeight
        );
        setWindowHeight(
          parentHeight && parentHeight > 0 ? parentHeight : window.innerHeight
        );
      };

      updateHeight();
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  const handleMouseEnter = () => {
    console.log("::entering mouse in shrots player");
    document.body.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    console.log("::exiting mouse in shrots player");
    document.body.style.overflow = "auto";
  };

  const handleScroll = (e) => {
    if (!windowHeight || isScrollingRef.current) return;

    const now = Date.now();

    if (!scrollStartTime.current) {
      scrollStartTime.current = now;
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const duration = Date.now() - scrollStartTime.current;
      console.log("Scroll Duration:", duration, "ms");

      scrollStartTime.current = null;

      let step = 1;
      console.log("::duration", duration);
      if (duration > 250) step = 2;
      if (duration > 400) step = 3;
      if (duration > 600) step = 4;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIndex = currentIndex + direction * step;
      nextIndex = Math.max(0, Math.min(items.length - 1, nextIndex));

      isScrollingRef.current = true;
      setCurrentIndex(nextIndex);

      animate(
        containerRef.current,
        { scrollTop: nextIndex * getAvailableHeight() },
        { duration: 0.5, ease: "easeInOut" }
      );

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }, 200);
  };

  const handleNavigation = (step) => {
    if (isScrollingRef.current) return;

    let nextIndex = currentIndex + step;
    nextIndex = Math.max(0, Math.min(items.length - 1, nextIndex));

    if (nextIndex === currentIndex) return;

    isScrollingRef.current = true;
    setCurrentIndex(nextIndex);

    animate(
      containerRef.current,
      { scrollTop: nextIndex * getAvailableHeight() },
      { duration: 0.5, ease: "easeInOut" }
    );

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <Box
        sx={{
          height: windowHeight,
          width: mergedContainerStyles.width,
          backgroundColor: mergedContainerStyles.backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...mergedContainerStyles.sx,
        }}
      >
        <Box sx={mergedLoadingBoxStyles}>No items to display</Box>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        height: windowHeight,
        width: mergedContainerStyles.width,
        overflowY: "hidden",
        position: "relative",
        backgroundColor: mergedContainerStyles.backgroundColor,
        ...mergedContainerStyles.sx,
      }}
      onWheel={handleScroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          style={{
            height: mergedMotionCardStyles.height,
            width: mergedMotionCardStyles.width,
            position: "absolute",
            top: `${index * 100}%`,
            display: "flex",
            justifyContent: mergedMotionCardStyles.justifyContent,
            alignItems: mergedMotionCardStyles.alignItems,
            backgroundColor: mergedMotionCardStyles.backgroundColor,
            ...mergedMotionCardStyles.sx,
          }}
          animate={{ y: -currentIndex * getAvailableHeight() }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ShortsCard
            {...item}
            actions={actions}
            styleProps={{
              cardStyles: mergedCardStyles,
              cardLeftBoxStyles: mergedCardLeftBoxStyles,
              videoBoxStyles: mergedVideoBoxStyles,
              myLogoStyles: mergedMyLogoStyles,
              myTitleStyles: mergedMyTitleStyles,
              subscribeBtnStyles: mergedSubscribeBtnStyles,
              shortTitleStyles: mergedShortTitleStyles,
              shortDesStyles: mergedShortDesStyles,
              cardRightBoxStyles: mergedCardRightBoxStyles,
              cardBtnBoxStyles: mergedCardBtnBoxStyles,
              cardIconStyles: mergedCardIconStyles,
              cardIconLogoStyles: mergedCardIconbtnLogoStyles,
              loadingBoxStyles: mergedLoadingBoxStyles,
            }}
            tootTipProps={{
              likeBtn_title: tooltipTitle_likeBtn,
              likeBtn_placement: tooltipPlacement_likeBtn,
              dislikeBtn_title: tooltipTitle_dislikeBtn,
              dislikeBtn_placement: tooltipPlacement_dislikeBtn,
              viewBtn_title: tooltipTitle_viewsBtn,
              viewBtn_placement: tooltipPlacement_viewsBtn,
              shareBtn_title: tooltipTitle_shareBtn,
              shareBtn_placement: tooltipPlacement_shareBtn,
            }}
            loading={loading}
          />
        </motion.div>
      ))}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: mergedNavBtnContainerStyles.width,
          height: mergedNavBtnContainerStyles.height,
          zIndex: 100,
          display: { xs: "none", md: "flex" },
          flexDirection: mergedNavBtnContainerStyles.flexDirection,
          gap: mergedNavBtnContainerStyles.gap,
          justifyContent: mergedNavBtnContainerStyles.justifyContent,
          alignItems: mergedNavBtnContainerStyles.alignItems,
          padding: mergedNavBtnContainerStyles.padding,
          ...mergedNavBtnContainerStyles.sx,
        }}
      >
        <Tooltip
          title={tooltipTitle_navBtnUp}
          placement={tooltipPlacement_navBtnUp}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: currentIndex > 0 ? 1 : 0,
              y: currentIndex > 0 ? 0 : 60,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <IconButton
              sx={{
                width: mergedNavBtnStyles.width,
                height: mergedNavBtnStyles.height,
                bgcolor: mergedNavBtnStyles.bgcolor,
                borderRadius: mergedNavBtnStyles.borderRadius,
                "&:hover": { bgcolor: mergedNavBtnStyles.hoverBgColor },
                opacity: currentIndex > 0 ? 1 : 0.5,
                // cursor: currentIndex > 0 ? "pointer" : "not-allowed",
                ...mergedNavBtnStyles.sx,
              }}
              onClick={() => handleNavigation(-1)}
              disabled={currentIndex === 0}
            >
              <ArrowUpwardIcon
                fontSize="large"
                sx={{
                  color: mergedNavBtnStyles.iconColor,
                  fontSize: mergedNavBtnStyles.iconSize,
                }}
              />
            </IconButton>
          </motion.div>
        </Tooltip>
        <Tooltip
          title={tooltipTitle_navBtnDown}
          placement={tooltipPlacement_navBtnDown}
        >
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: currentIndex < items.length - 1 ? 1 : 0,
              y: currentIndex < items.length - 1 ? 0 : -60,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <IconButton
              sx={{
                width: mergedNavBtnStyles.width,
                height: mergedNavBtnStyles.height,
                bgcolor: mergedNavBtnStyles.bgcolor,
                borderRadius: mergedNavBtnStyles.borderRadius,
                "&:hover": { bgcolor: mergedNavBtnStyles.hoverBgColor },
                opacity: currentIndex > 0 ? 1 : 0.5,
                // cursor: currentIndex > 0 ? "pointer" : "not-allowed",
                ...mergedNavBtnStyles.sx,
              }}
              onClick={() => handleNavigation(1)}
              disabled={currentIndex === items.length - 1}
            >
              <ArrowDownwardIcon
                fontSize="large"
                sx={{
                  color: mergedNavBtnStyles.iconColor,
                  fontSize: mergedNavBtnStyles.iconSize,
                }}
              />
            </IconButton>
          </motion.div>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ShortsPlayer;
