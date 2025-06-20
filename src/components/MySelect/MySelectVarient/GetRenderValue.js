import { Box, Typography } from "@mui/material";
import { getFullName } from "@/utils";

export const getRenderValue = (type, isMultiple = false) => {
  switch (type) {
    case "user_with_avatar": {
      const UserWithAvatarValue = (selected, context) => {
        const selectedArray = Array.isArray(selected) ? selected : [selected];
        const selectedObjects =
          context?.options?.filter((opt) =>
            selectedArray.includes(opt?.id || opt?.value)
          ) || [];

        if (selectedObjects.length === 0) return "";

        return (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selectedObjects.map((opt) => (
              <Box
                key={opt?.id || opt?.value}
                display="flex"
                alignItems="center"
                gap={0.5}
                px={1}
                py={0.5}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={opt?.avatar || "/dummyUser.svg"}
                  alt={opt?.label || opt?.firstName}
                  referrerPolicy="no-referrer"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography fontSize="13px">
                  {getFullName(opt?.firstName, opt?.lastName)}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      };

      UserWithAvatarValue.displayName = "UserWithAvatarValue";
      return UserWithAvatarValue;
    }

    case "label": {
      const LabelRenderValue = (selected, context) => {
        if (isMultiple) {
          const selectedArray = Array.isArray(selected) ? selected : [selected];
          const selectedObjects =
            context?.options?.filter((opt) =>
              selectedArray.includes(opt?.value || opt?.id)
            ) || [];

          if (selectedObjects.length > 0) {
            return selectedObjects
              .map((s) => s.label || s.name || s)
              .join(", ");
          }
          return selectedArray
            .map((s) => (typeof s === "string" ? s : s?.label || s?.name || s))
            .join(", ");
        } else {
          const value = Array.isArray(selected) ? selected[0] : selected;
          const selectedOption = context?.options?.find(
            (opt) => (opt?.value || opt?.id) === (value || value?.id)
          );

          if (!selectedOption)
            return value?.label || value?.name || value || "";

          return (
            <Box display="flex" alignItems="center" gap={1} px={1}>
              <Typography fontSize="13px">
                {selectedOption.label || selectedOption.name}
              </Typography>
            </Box>
          );
        }
      };

      LabelRenderValue.displayName = "LabelRenderValue";
      return LabelRenderValue;
    }

    default: {
      const DefaultRenderValue = (selected, context) => {
        const selectedArray = Array.isArray(selected) ? selected : [selected];
        const selectedObjects =
          context?.options?.filter((opt) =>
            selectedArray.includes(opt?.id || opt?.value)
          ) || [];

        if (selectedObjects.length > 0) {
          return selectedObjects.map((s) => s.label || s.name || s).join(", ");
        }
        return selectedArray
          .map((s) => (typeof s === "string" ? s : s?.label || s?.name || s))
          .join(", ");
      };

      DefaultRenderValue.displayName = "DefaultRenderValue";
      return DefaultRenderValue;
    }
  }
};
