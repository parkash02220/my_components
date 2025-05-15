"use client";

import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { useAppContext } from "@/context/AppContext";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import HeaderProjectName from "./HeaderProjectName";
import HeaderNotifications from "./HeaderNotifications";
import HeaderUserProfile from "./HeaderUserProfile";
import { usePathname } from "next/navigation";
import { useNavigationInfo } from "@/hooks/common/useNavigationInfo";
import { useState } from "react";
export default function Header({}) {
  const { state } = useAppContext();
  const { isMd, isSm, isXs } = useBreakpointFlags();
  const {projects} = state;
  const pathname = usePathname();
  const {parent,child} = useNavigationInfo({path:pathname,projects});
  
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: "1px solid #eee",
          zIndex: 1101,
          width: isMd ? "calc(100% - 60px)" : "100%",
          alignSelf: "flex-end",
        }}
      >
        <Box
          sx={{
            pl: isXs ? 0 : isMd ? 3 : 5,
            pr: isXs ? 0 : isMd ? 3 : 5,
            height: isXs ? "64px" : "75px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
       {child?.segment?.startsWith("projects") ? (
            <HeaderProjectName />
          ) : (
            <Box>
              <Typography  variant="h4"
                fontSize={isXs ? "1.125rem" : isSm ? "1.25rem" : "1.5rem"}
                fontWeight={700}
                color="#1C252E"
              > {child?.title || parent?.title || ""}</Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
                cursor: "pointer",
                borderRadius: "12px",
                gap: 1,
              }}
            >
              <HeaderNotifications />
              <HeaderUserProfile />
            </Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
