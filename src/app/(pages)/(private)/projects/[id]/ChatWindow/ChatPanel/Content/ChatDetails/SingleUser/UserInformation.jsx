import { Box, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const UserInformation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleIsExpanded = () => {
    setIsExpanded((pre) => !pre);
  };
  const inoformationData = [
    {
      label: {
        src: "/locationIcon.svg",
        alt: "location",
      },
      value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
    },
    {
      label: {
        src: "/mobileNumberIcon.svg",
        alt: "location",
      },
      value: "999999999",
    },
    {
      label: {
        src: "/emailIcon.svg",
        alt: "location",
      },
      value: "parkash@gmail.com",
    },
  ];
  return (
    <>
      <Box
        onClick={toggleIsExpanded}
        sx={{
          background: "#F4F6F8",
          p: "8px 12px 8px 20px",
          height: 40,
          position: "relative",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
        }}
      >
        <Typography color="#637381" fontWeight={700} fontSize={12}>
          Information
        </Typography>
        <KeyboardArrowRightIcon
          sx={{
            color: "#637381",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </Box>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box minHeight={0}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            p={"20px 16px"}
          >
            {inoformationData?.map((data, i) => {
              return (
                <React.Fragment key={i}>
                  <InformationRow label={data?.label} value={data?.value} />
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      </Collapse>
    </>
  );
};
export default UserInformation;

export const InformationRow = ({ label, value }) => {
  return (
    <>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <Box flexShrink={0}>
          <img
            src={label?.src}
            alt={label?.atl}
            style={{ width: "20px", height: "20px" }}
          />
        </Box>
        <Box>
          <Typography
            color="#1C252E"
            fontSize={14}
            sx={{ wordBreak: "break-all" }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
