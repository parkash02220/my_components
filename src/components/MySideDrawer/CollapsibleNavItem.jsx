import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SingleNavItem } from "./SingleNavItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const CollapsibleNavItem = ({
  item,
  open,
  isExpanded,
  onToggle,
  selectedSegment,
  onClick,
}) => {
  return (
    <>
      <ListItemButton
        onClick={onToggle}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          background: selectedSegment === item.segment ? "#ECF8F4" : "#FFFFFF",
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
            color: selectedSegment === item.segment ? "#00A76F" : "#637381",
          }}
        />
        {open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child, idx) => (
            <SingleNavItem
              key={idx}
              item={child}
              open={open}
              selectedSegment={selectedSegment}
              onClick={() => onClick(child)}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
