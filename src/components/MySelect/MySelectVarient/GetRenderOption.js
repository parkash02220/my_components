import { getFullName } from "@/utils";
import { Box, Typography } from "@mui/material";

export const getRenderOptions = (type) => {
  switch (type) {
    case "all_users": {
      return (option) => (
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src={option?.avatar || "/dummyUser.svg"}
            alt={option?.firstName || option?.label}
            referrerPolicy="no-referrer"
            style={{ width: 24, height: 24, borderRadius: "50%" }}
          />
          <Typography fontSize={14}>
            {getFullName(option?.firstName, option?.lastName)}
          </Typography>
        </Box>
      );
    }

    case "all_departments":
      case "designation_by_department": {
      return (option) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={14}>
            {option?.label}
          </Typography>
        </Box>
      );
    }

    default: {
      return (option) => (
        <Typography>
          {option?.label || option?.name || option?.firstName || "Unknown"}
        </Typography>
      );
    }
  }
};
