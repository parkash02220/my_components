"use client";

import { AppBar, Box, IconButton, Typography } from "@mui/material";

export default function Header() {
  const navigationItems = [
    { image: { path: "/notificationIcon.svg", alt: "notification" } },
    { image: { path: "/userIcon.svg", alt: "user" } },
    { image: { path: "/settingsIcon.svg", alt: "settings" } },
  ];
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ borderBottom: "1px solid #eee" }}
    >
      <Box
        sx={{
          pl: 5,
          pr: 5,
          height: "64px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "transparent",
            m: 0,
            p: 0,
            cursor: "pointer",
            gap: 1,
          }}
        >
          <Typography fontWeight={600} fontSize={14} color="#1C252E">
            Team 1
          </Typography>
        </Box>
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
              backgroundColor: "rgba(145,158,171,0.08)",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                p: 1,
                display: "inline-flex",
                color: "#637381",
                cursor: "pointer1",
              }}
            >
              <img
                src="/searchIcon.svg"
                alt="search"
                style={{ width: "20px", height: "20px", flexShrink: "0px" }}
              />
            </Box>
            {navigationItems?.map((item, index) => {
              return (
                <IconButton
                  key={index}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "24px",
                    color: "#637381",
                    outline: "0px",
                    borderWidth: "0px",
                    margin: "0px",
                    textDecoration: "none",
                    flex: "0 0 auto",
                    padding: "8px",
                    borderRadius: "50%",
                    transition:
                      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "rgba(99,115,129,0.08)",
                    },
                  }}
                >
                  <img
                    src={item?.image?.path}
                    alt={item?.image?.alt}
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: 0,
                      display: "inline-flex",
                    }}
                  />
                </IconButton>
              );
            })}
            <IconButton
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "24px",
                color: "#637381",
                outline: "0px",
                borderWidth: "0px",
                margin: "0px",
                textDecoration: "none",
                flex: "0 0 auto",
                padding: "8px",
                borderRadius: "50%",
                transition:
                  "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "rgba(99,115,129,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  minWidth: "unset",
                  minHeight: "unset",
                  overflow: "hidden",
                  position: "relative",
                  padding: "3px",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "20px",
                    lineHeight: 1,
                    borderRadius: "50%",
                    overflow: "hidden",
                    userSelect: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src="	https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp"
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      textIndent: "1000px",
                    }}
                  />
                </Box>
              </Box>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
