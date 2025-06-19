import { Box, Typography } from "@mui/material";
import { getFullName } from "@/utils";

export const getRenderValue = (type) => {
  switch (type) {
    case "all_users": {
      return (selected, context) => {
        const selectedObjects = context?.options?.filter((opt) =>
          selected.includes(opt.id || opt.value)
        ) || [];

        return (
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selectedObjects.map((opt) => (
              <Box
                key={opt.id}
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
                  alt={opt.label}
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
    }

    case "all_departments":
    case "designation_by_department"
    : {
        return (selected, context) => {
            const value = Array.isArray(selected) ? selected[0] : selected;
            const selectedOption = context?.options?.find(
              (opt) => (opt.id || opt.value) === value?.id
            );
            
            if (!selectedOption) return selected || ""; 
          return (
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              px={1}
            >
              <Typography fontSize="13px">
                {selectedOption.label || selectedOption.name}
              </Typography>
            </Box>
          );
        };
      }
      
    default: {
      return (selected, context) => {
        const selectedObjects = context?.options?.filter((opt) =>
          selected.includes(opt?.id || opt?.value)
        ) || [];

        return selectedObjects.map((s) => s.label || s.name || s).join(", ");
      };
    }
  }
};
