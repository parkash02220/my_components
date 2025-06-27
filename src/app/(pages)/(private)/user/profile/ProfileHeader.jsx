import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
const ProfileHeader = ({ selectedTab, onTabChange }) => {
  const {isDownXs} = useResponsiveBreakpoints();
   const {fontSize,iconSize} = useResponsiveValue();
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };
  const allTabValues = [
    {
      value: "general",
      label: "General",
      icon: { src: "/generalProfileIcon.svg", alt: "general" },
    },
    {
      value: "security",
      label: "Security",
      icon: { src: "/securityProfileIcon.svg", alt: "security" },
    },
  ];
  return (
    <>
      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          {allTabValues?.map((item) => {
            return (
              <Tab
                key={item?.value}
                sx={{
                  fontSize: fontSize,
                  fontWeight: 700,
                  minHeight: isDownXs ? '50px' : '72px',  
                }}
                icon={
                  <Box>
                    <img
                      src={item?.icon?.src}
                      alt={item?.icon?.alt}
                      style={{ width: iconSize, height:iconSize }}
                    />
                  </Box>
                }
                label={item?.label}
                iconPosition="start"
                value={item?.value}
              />
            );
          })}
        </Tabs>
      </Box>
    </>
  );
};
export default ProfileHeader;
