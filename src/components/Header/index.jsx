"use client";

import { AppBar, Box, IconButton, Typography } from "@mui/material";
import HeaderProjectName from "@/components/Header/HeaderProjectName/index";
import HeaderNotifications from "./HeaderNotifications";
import HeaderUserProfile from "./HeaderUserProfile";
import { useNavigationInfo } from "@/hooks/common/useNavigationInfo";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
export default function Header() {
  const { isDownMd, isDownSm, isDownXs } = useResponsiveBreakpoints();
  const { projects } = useProjectsContext()?.state;
  const { parent, child } = useNavigationInfo({ projects });
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: "1px solid #eee",
          zIndex: 1101,
          width: isDownMd ? "calc(100% - 60px)" : "100%",
          alignSelf: "flex-end",
        }}
      >
        <Box
          sx={{
            pl: isDownXs ? 0 : isDownMd ? 3 : 5,
            pr: isDownXs ? 0 : isDownMd ? 3 : 5,
            height: { xs: "56px", sm: "60px", md: "75px" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {child?.path?.startsWith("projects") ? (
            <HeaderProjectName />
          ) : (
            <Box>
              <Typography variant="title1" fontWeight={700}>
                {" "}
                {child?.title || parent?.title || ""}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
              minWidth:'16px',
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
                gap: '4px',
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
