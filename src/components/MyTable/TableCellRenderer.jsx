// components/TableCellRenderer.jsx
import React from "react";
import {
  Checkbox,
  Button,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Avatar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TableCellRenderer = ({
  type,
  value,
  onChange,
  onClick,
  tooltip,
  icon,
  icons,
  isAllRowSelected,
}) => {
  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          checked={isAllRowSelected ? true : Boolean(value)}
          onChange={onChange}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: {
                xs: "16px",
                sm: "18px",
                md: "20px",
                lg: "22px",
              },
            },
            width: {
              xs: 20,
              sm: 24,
              md: 28,
              lg: 32,
            },
            height: {
              xs: 20,
              sm: 24,
              md: 28,
              lg: 32,
            },
          }}
        />
      );

    case "button":
      return (
        <Button variant="contained" size="small" onClick={onClick}>
          {value}
        </Button>
      );

    case "iconButton":
      return (
        <Tooltip title={tooltip || ""}>
          <IconButton onClick={onClick} size="small" sx={{ padding: "8px" }}>
            {icon === "edit" ? (
              <Edit sx={{ width: "20px", height: "20px" }} />
            ) : icon === "delete" ? (
              <Delete sx={{ width: "20px", height: "20px" }} />
            ) : icon === "menu" ? (
              <img
                src="/menuVerticalIcon.svg"
                alt="menu"
                style={{ height: "20px", width: "20px" }}
              />
            ) : (
              icon
            )}
          </IconButton>
        </Tooltip>
      );

    case "multipleIconButton": {
      return (
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{ minWidth: 0 }}
          justifyContent={"center"}
        >
          {icons?.map((icon, index) => {
            return (
              <Tooltip title={icon?.tooltip || ""} key={index}>
                <IconButton onClick={icon?.onClick} size="small">
                  {icon?.icon === "edit" ? (
                    <Edit
                      sx={{
                        width: { xs: "16px", sm: "20px" },
                        height: { xs: "16px", sm: "20px" },
                      }}
                    />
                  ) : icon?.icon === "delete" ? (
                    <Delete sx={{ width: "20px", height: "20px" }} />
                  ) : icon?.icon === "menu" ? (
                    <img
                      src="/menuVerticalIcon.svg"
                      alt="menu"
                      style={{ height: "20px", width: "20px" }}
                    />
                  ) : (
                    icon?.icon
                  )}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      );
    }

    case "avatarText":
      return (
        <Box display={"flex"} gap={1} alignItems="center">
          <Avatar
            src={value?.avatar}
            alt={value?.name}
            sx={{
              width: { xs: 22, sm: 30 },
              height: { xs: 22, sm: 30 },
              fontSize: { xs: 12, sm: 13, lg: 14 },
            }}
          >
            {value?.name?.[0]}
          </Avatar>
          <Typography variant="primary">{value?.name}</Typography>
        </Box>
      );

    case "text":
    default:
      return <Typography variant="primary">{value}</Typography>;
  }
};

export default TableCellRenderer;
