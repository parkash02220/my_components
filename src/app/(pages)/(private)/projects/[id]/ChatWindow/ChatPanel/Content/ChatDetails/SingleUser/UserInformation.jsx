import { Box, Collapse, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
import { getDepartmentName } from "@/utils";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
const UserInformation = ({user}) => {
  const {isXs} = useResponsiveBreakpoints();
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleIsExpanded = () => {
    setIsExpanded((pre) => !pre);
  };
  const {email,userProfile} = user;
  const {allDepartments} = useOrganizationContext()?.state;
  const department = useMemo(()=>{
     return getDepartmentName(allDepartments,userProfile?.department);
  },[allDepartments,user]);
  const inoformationData = [
    // {
    //   label: {
    //     src: "/locationIcon.svg",
    //     alt: "location",
    //   },
    //   value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
    // },
    {
      label: {
        src: "/department.svg",
        alt: "department",
      },
      value: department,
    },
    {
      label: {
        src: "/mobileNumberIcon.svg",
        alt: "phone number",
      },
      value: userProfile?.phone,
    },
    {
      label: {
        src: "/emailIcon.svg",
        alt: "location",
      },
      value: email,
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
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{overflow:'auto',flex:'1 1 auto',minHeight:'100px !important'}}>
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
                  <InformationRow label={data?.label} value={data?.value} screen={{isXs}}/>
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

export const InformationRow = ({ label, value,screen={} }) => {
  if(!value) return null;
  const {isXs} = screen;
  return (
    <>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <Box flexShrink={0}>
          <img
            src={label?.src}
            alt={label?.atl}
            style={{ width: isXs ? "16px" : "20px", height: isXs ? "16px" :  "20px" }}
          />
        </Box>
        <Box>
          <Typography
            variant="primary"
            sx={{ wordBreak: "break-all" }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
