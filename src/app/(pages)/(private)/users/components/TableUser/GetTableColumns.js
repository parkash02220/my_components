import { Box, Checkbox } from "@mui/material";

export const getUserTableColumns = ({
  selectedUsers,
  isAllRowSelected,
  isLoading,
  handleSelectAllUsers,
  handleSingleUserSelect,
  handleEditClick,
}) => {
  return [
    {
      id: "isSelected",
      label: (
        <Box>
          <Checkbox
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
            indeterminate={selectedUsers.length > 0 && !isAllRowSelected}
            checked={!isLoading && isAllRowSelected}
            onChange={(e) => handleSelectAllUsers(e.target.checked)}
          />
        </Box>
      ),
      type: "checkbox",
      onChange: handleSingleUserSelect,
      align: "center",
      sx: { width: "40px", minWidth: "40px", maxWidth: "40px" },
    },
    {
      id: "nameWithAvatar",
      label: "Name",
      type: "avatarText",
      sx: { textTransform: "capitalize" },
    },
    { id: "email", label: "Email", type: "text" },
    {
      id: "designation",
      label: "Designation",
      type: "text",
      sx: { textTransform: "capitalize" },
    },
    {
      id: "edit_menu",
      label: "",
      type: "multipleIconButton",
      icons: [
        { icon: "edit", onClick: handleEditClick, tooltip: "Edit Task" },
        // add more icons here
      ],
      sx: { minWidth: "40px", maxWidth: "50px", padding: "4px" },
    },
  ];
};
