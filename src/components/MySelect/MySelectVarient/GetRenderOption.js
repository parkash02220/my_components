import { getFullName } from "@/utils";
import { Box, Checkbox, Typography } from "@mui/material";

export const getRenderOptions = (type, isMultiple, selected = []) => {
  const isSelected = (opt) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    return selectedArray.includes(opt?.value);
  };
  switch (type) {
    case "user_with_avatar": {
      const UserWithAvatarOption = (option) => (
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
      UserWithAvatarOption.displayName = "UserWithAvatarOption";
      return UserWithAvatarOption;
    }

    case "label": {
      const LabelOption = (option) => (
        <Box display="flex" alignItems="center" gap={1}>
          {isMultiple && (
            <Checkbox
              size="small"
              sx={{ padding: "2px" }}
              checked={isSelected(option)}
            />
          )}
          <Typography fontSize={14}>{option?.label}</Typography>
        </Box>
      );
      LabelOption.displayName = "LabelOption";
      return LabelOption;
    }
    default: {
      const DefaultOption = (option) => (
        <Typography>
          {option?.label || option?.name || option?.firstName || "Unknown"}
        </Typography>
      );
      DefaultOption.displayName = "DefaultOption";
      return DefaultOption;
    }
  }
};
