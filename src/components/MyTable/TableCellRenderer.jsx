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
}) => {
  switch (type) {
    case "checkbox":
      return <Checkbox checked={Boolean(value)} onChange={onChange} />;

    case "button":
      return (
        <Button variant="contained" size="small" onClick={onClick}>
          {value}
        </Button>
      );

    case "iconButton":
      return (
        <Tooltip title={tooltip || ""}>
          <IconButton onClick={onClick} size="small" sx={{padding:"8px"}}>
            {icon === "edit" ? (
              <Edit sx={{width:"20px",height:"20px"}}/>
            ) : icon === "delete" ? (
              <Delete sx={{width:"20px",height:"20px"}}/>
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
      console.log("::icons",icons)
      return (
        <Box display={'flex'} alignItems={'center'}  sx={{ minWidth: 0 }} justifyContent={'center'}>
          {icons?.map((icon,index) => {
          return  <Tooltip title={icon?.tooltip || ""} key={index}>
              <IconButton onClick={icon?.onClick} size="small">
                {icon?.icon === "edit" ? (
                   <Edit sx={{width:"20px",height:"20px"}}/>
                ) : icon?.icon === "delete" ? (
                  <Delete sx={{width:"20px",height:"20px"}}/>
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
            </Tooltip>;
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
            sx={{ width: 30, height: 30, fontSize: '0.875rem' }}
          >
            {value?.name?.[0]}
          </Avatar>
          <Typography variant="body2" color="#1C252E">
            {value?.name}
          </Typography>
        </Box>
      );

    case "text":
    default:
      return (
        <Typography variant="body2" color="#1C252E">
          {value}
        </Typography>
      );
  }
};

export default TableCellRenderer;
