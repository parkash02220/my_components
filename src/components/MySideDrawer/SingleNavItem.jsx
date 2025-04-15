import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

export const SingleNavItem = ({ item, open, selectedSegment, onClick }) => {
  const isSelected = selectedSegment === item.segment;

  const content = (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        background: isSelected ? "#ECF8F4" : "#FFFFFF",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? "12px" : "auto",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        sx={{ opacity: open ? 1 : 0 }}
        primaryTypographyProps={{
          fontSize: "14px",
          fontWeight: 500,
          color: isSelected ? "#00A76F" : "#637381",
        }}
      />
    </ListItemButton>
  );

  return open ? (
    <ListItem disablePadding>{content}</ListItem>
  ) : (
    <Tooltip title={item.title} placement="right">
      <ListItem disablePadding>{content}</ListItem>
    </Tooltip>
  );
};
