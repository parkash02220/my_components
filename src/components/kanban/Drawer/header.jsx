import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

export const Header = () => {
  const menuItems = [
    {
      label: "Rename",
      onClick: () => {},
    },
    {
      label: "Clear",
      onClick: () => {},
    },
    {
      label: "Delete",
      onClick: () => {},
      color: "#FF5630",
    },
  ];
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"20px 8px 20px 20px"}
        borderBottom={"1px solid rgba(145 158 171 / 0.2)"}
      >
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            display: "flex",
            cursor: "pointer",

            backgroundColor: "rgba(145,158,171,0.08)",
            height: "30px",
            padding: "6px 8px",
            borderWidth: "0px",
            borderRadius: "8px",
            transition:
              "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              color: "#1C252E",
            }}
          >
            In progress
          </Typography>{" "}
          <img
            src="/dropdown-arrow.svg"
            alt="drop down icon"
            style={{ width: "16px", height: "16px" }}
          />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              borderRadius: "10px",
              background: "#FFFFFFE6",
              boxShadow:
                "0px 5px 5px -3px rgba(145 158 171 / 0.2),0px 8px 10px 1px rgba(145 158 171 / 0.14),0px 3px 14px 2px rgba(145 158 171 / 0.12)",
              color: "#1C252E",
              backgroundColor: "rgba(255,255,255)",
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.onClick}
              sx={{
                backgroundColor: "transparent",
                margin: "0px",
                marginInline: "3px",
                cursor: "pointer",
                padding: "6px 8px",
                borderRadius: "6px",
              }}
            >
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                minWidth="140px"
                mb={"4px"}
              >
                <Typography fontSize={14} color={item.color || "inherit"}>
                  {item.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <MyTooltip title={"Like"} placement="bottom">
            <IconButton
              sx={{
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "#00A76F",
                "&::hover": {
                  background: "rgba(0,167,111,0.08)",
                },
              }}
            >
              <img
                src="/like.svg"
                alt="like"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </MyTooltip>
          <MyTooltip title={"Delete task"} placement="bottom">
            <IconButton
              sx={{
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "#00A76F",
                "&::hover": {
                  background: "rgba(0,167,111,0.08)",
                },
              }}
            >
              <img
                src="/deleteIcon.svg"
                alt="delete"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </MyTooltip>
          <IconButton
            sx={{
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              color: "#00A76F",
              "&::hover": {
                background: "rgba(0,167,111,0.08)",
              },
            }}
          >
            <img
              src="/menuVerticalIcon.svg"
              alt="menu"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
