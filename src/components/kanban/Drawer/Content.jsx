import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MyTextField from "../../MyTextfield/MyTextfield";
import { motion, AnimatePresence } from "framer-motion";
export const Content = ({ currentTab, tabValues, handleTabChange }) => {
  const containerRef = useRef(null);

  const [targetStyle, setTargetStyle] = useState({ left: 0, width: 0 });
  const [prevStyle, setPrevStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);
  const [motionKey, setMotionKey] = useState(currentTab);
  const [prevTab, setPrevTab] = useState(currentTab);

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

      setMotionKey(currentTab);
    }

    setPrevTab(currentTab);
  }, [currentTab]);

  return (
    <>
      <Box>
        <Box
          sx={{ width: "100%", background: "#F4F6F8" }}
          className="editTask_tabs"
          padding={1}
        >
          <Box sx={{ position: "relative" }} ref={containerRef}>
            <motion.div
              key={motionKey}
              initial={{
                left: prevStyle.left,
                width: targetStyle.width,
                opacity: 0.5,
              }}
              animate={{
                left: targetStyle.left,
                width: targetStyle.width,
                opacity: 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
                  label={tab?.label}
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
        <Box padding={"24px 20px"}>
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Box>
              <Typography
                fontSize={18}
                fontWeight={600}
                padding={"4px 0px 5px"}
                color="#1C252E"
              >
                Title name
              </Typography>
            </Box>

            <SectionRow label="Reporter" className="editTask__reporterBox">
              <AvatarBox src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp" />
            </SectionRow>

            <SectionRow label="Assignee" className="editTask__assigneeBox">
              {[
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-2.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-3.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-4.webp",
              ].map((a, i) => (
                <AvatarBox key={i} src={`${a}`} />
              ))}
              <Box
                width={40}
                height={40}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                fontSize={"1.25rem"}
                overflow={"hidden"}
                padding={"8px"}
                border={"1px dashed rgba(145 158 171 / 0.2)"}
                sx={{
                  cursor: "pointer",
                  background: "rgba(145,158,171,0.08)",
                }}
              >
                <img
                  src="/addAssignIcon.svg"
                  alt="add assignee"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "transparent",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </SectionRow>
            <SectionRow label="Labels" className="editTask__labelsBox">
              {["Technology", "Health and Wellness", "Finance"].map(
                (label, i) => (
                  <LabelTag key={i} text={label} />
                )
              )}
            </SectionRow>
            <SectionRow label="Due date" className="editTask__dueDateBox">
              <Typography fontWeight={700} color="#1C252E" fontSize="13px">
                23-24 Apr 2025
              </Typography>
            </SectionRow>
            <SectionRow label="Priority" className="editTask__priorityBox">
              <PriorityOption label="Low" iconSrc="/lowPriorityIcon.svg" />
              <PriorityOption
                label="Medium"
                iconSrc="/meduimPriorityIcon.svg"
                isSelected
              />
              <PriorityOption label="High" iconSrc="/highPriorityIcon.svg" />
            </SectionRow>
            <SectionRow
              label="Description"
              className="editTask__descriptionBox"
            >
              <Box width="100%">
                <MyTextField
                  label=""
                  multiline
                  rows={4}
                  boxShadow="inset 0 0 0 1px rgba(145,158,171,0.24)"
                  borderColor="transparent"
                  fullWidth
                  hoverBorderColor="#1C252E"
                />
              </Box>
            </SectionRow>
            <SectionRow
              label="Attachments"
              className="editTask__attachmentsBox"
            >
              <Box
                sx={{
                  width: "64px",
                  height: "64px",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#919EAB",
                  background: "rgba(145,158,171,0.08)",
                  border: "rgba(145,158,171,0.16)",
                }}
              >
                <img
                  src="/attachmentsIcon.svg"
                  alt="attachments"
                  style={{ widows: "28px", height: "28px" }}
                />
              </Box>
            </SectionRow>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SectionRow = ({ label, children, className = "" }) => (
  <Box display="flex" alignItems="center" className={className}>
    <Typography
      fontWeight={600}
      fontSize="0.75rem"
      width="100px"
      flexShrink={0}
      color="#637381"
    >
      {label}
    </Typography>
    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
      {children}
    </Box>
  </Box>
);

const AvatarBox = ({ src, alt = "user" }) => (
  <Box
    width={40}
    height={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    overflow="hidden"
    fontSize="1.25rem"
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        color: "transparent",
      }}
    />
  </Box>
);

const LabelTag = ({ text }) => (
  <Box
    sx={{
      height: "24px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0,184,217,0.16)",
      padding: "0px",
      borderRadius: "8px",
    }}
  >
    <Typography
      sx={{
        fontWeight: 500,
        paddingInline: "8px",
        fontSize: "13px",
        color: "#006C9C",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </Typography>
  </Box>
);

const PriorityOption = ({ label, iconSrc, isSelected = false }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      padding: "4px 10px 4px 6px",
      borderRadius: "8px",
      boxShadow: "inset 0 0 0 1px rgba(145,158,171,0.24)",
      border: isSelected ? "2px solid black" : "none",
    }}
  >
    <Box sx={{ width: "20px", height: "20px", marginRight: "4px" }}>
      <img
        src={iconSrc}
        alt={label}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
    <Typography
      sx={{
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "capitalize",
        color: "#1C252E",
      }}
    >
      {label}
    </Typography>
  </Box>
);
