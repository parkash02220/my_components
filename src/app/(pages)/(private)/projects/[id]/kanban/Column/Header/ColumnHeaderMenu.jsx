import ConfirmationPopup from "@/components/ConfirmationPopup";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useClearSection from "@/hooks/projects/section/useClearSection";
import useDeleteSection from "@/hooks/projects/section/useDeleteSection";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

export default function ColumnHeaderMenu({
  columnName,
  startEditing,
  column,
  setShowEditTextfield,
}) {
  const { isXs } = useBreakpointFlags();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const { loadingClearSection, clearSection } = useClearSection();
  const { loadingDeleteSection, deleteSection } = useDeleteSection();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleDeletePopupOpen = () => {
    handleMenuClose();
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };

  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuEditButton = () => {
    handleMenuClose();
    setTimeout(() => {
      startEditing(column.title);
      setShowEditTextfield(true);
    }, 100);
  };

  const handleMenuClearButton = () => {
    clearSection(column?.id);
    handleMenuClose();
  };

  const handleMenuDeleteButton = async () => {
    await deleteSection(column?.id);
    handleDeletePopupClose();
  };
  const menuItems = [
    {
      label: "Rename",
      icon: "/rename.svg",
      onClick: handleMenuEditButton,
    },
    {
      label: "Clear",
      icon: "/clear.svg",
      onClick: handleMenuClearButton,
    },
    {
      label: "Delete",
      icon: "/delete.svg",
      onClick: handleDeletePopupOpen,
      color: "#FF5630",
    },
  ];

  return (
    <>
      {deletePopupOpen && (
        <ConfirmationPopup
          title={"Delete Section"}
          handleClose={handleDeletePopupClose}
          open={deletePopupOpen}
          message={columnName}
          type={"delete"}
          submitAction={handleMenuDeleteButton}
          loading={loadingDeleteSection}
        />
      )}
      <Box
        sx={{
          "&:hover": {
            background: "rgba(99,115,129,0.08)",
          },
          borderRadius: "50%",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            padding: "0px",
            width: "20px",
            height: "20px",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <img
            src="/columnMenuIcon.svg"
            alt="column menu icon"
            width={"100%"}
            height={"100%"}
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            background: "#FFFFFFE6",
            boxShadow:
              "0px 5px 5px -3px rgba(145 158 171 / 0.2),0px 8px 10px 1px rgba(145 158 171 / 0.14),0px 3px 14px 2px rgba(145 158 171 / 0.12)",
            color: "#1C252E",
            backgroundColor: "rgba(255,255,255)",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={item.onClick}
            sx={{
              backgroundColor: "transparent",
              margin: "0px",
              marginInline: "3px",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "6px",
              minHeight: isXs ? "40px" : "48px",
            }}
          >
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              minWidth="140px"
              mb={"4px"}
            >
              <img
                src={item.icon}
                alt={item.label.toLowerCase()}
                width={20}
                height={20}
              />
              <Typography fontSize={14} color={item.color || "inherit"}>
                {item.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
