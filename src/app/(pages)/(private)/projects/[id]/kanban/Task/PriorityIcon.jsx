import { Box } from "@mui/material";

export default function PriorityIcon({priority}) {
    const priorityList = [
        { label: "Low", value: "low", icon: "/lowPriorityIcon.svg" },
        { label: "Medium", value: "medium", icon: "/meduimPriorityIcon.svg" },
        { label: "High", value: "high", icon: "/highPriorityIcon.svg" },
      ];
    const getPriorityIcon = (priority) => {
        const match = priorityList.find((p) => p.value === priority);
        return match ? match.icon : null;
      };

    return (
        <Box
        sx={{
          width: "20px",
          height: "20px",
          position: "absolute",
          top: "4px",
          right: "4px",
          color: "red",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={getPriorityIcon(priority)}
          alt="priority"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    );
  }
  