import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
const ProfileHeader = ({selectedTab,setSelectedTab}) => {


  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const allTabValues = [
    {
      id: 0,
      value: "general",
      label: "General",
      icon: { src: "/generalProfileIcon.svg", alt: "general" },
    },
    {
      id: 1,
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
                fontSize:"14px",
                fontWeight:700,
              }}
                icon={
                  <Box
                  >
                    <img
                      src={item?.icon?.src}
                      alt={item?.icon?.alt}
                      style={{ width: "24px", height: "24px" }}
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
