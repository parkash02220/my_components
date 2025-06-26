import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MyTable from "@/components/MyTable";
import useDeleteUser from "@/hooks/user/useDeleteUser";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import EditUserPopup from "../../EditUserPopup";
import { getUserTableColumns } from "./GetTableColumns";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const TableUser = ({
  data,
  setData,
  getAllUsersFromBackend,
  totalUsers,
  selectedUsers,
  loadingAllUsers,
  page,
  setSelectedUsers,
  debouncedSearchValue,
  pageSize,
  setPage,
  setPageSize,
  handlePageSizeChange,
  hasFetchedOnce,
}) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const { loadingDeleteUser, errorDeleteUser, deleteUser } = useDeleteUser();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const isLoading = loadingAllUsers || page === 0;
  const isAllRowSelected =
    selectedUsers?.length > 0 &&
    (selectedUsers?.length === pageSize ||
      selectedUsers?.length === totalUsers);
  const msgForDeleteUser =
    selectedUsers?.length === 1 ? "1 user" : `${selectedUsers?.length} users`;
  const handleSelectAllUsers = (checked) => {
    if (checked) {
      setSelectedUsers(data);
    } else {
      setSelectedUsers([]);
    }
  };
  const handleSingleUserSelect = (e, row) => {
    const isUserPresentAlready = selectedUsers?.some(
      (user) => user?.id === row?.id
    );
    if (isUserPresentAlready) {
      setSelectedUsers((pre) => pre?.filter((user) => user?.id !== row?.id));
    } else {
      setSelectedUsers((pre) => [...pre, row]);
    }
  };

  const handleEditClick = (e, row) => {
    setSelectedUserForEdit(row);
    handleOpenEditPopup();
  };
  const handleMenuClick = (e, row) => {
    console.log("::menu click", row);
  };
  const columns = getUserTableColumns({
    selectedUsers,
    isAllRowSelected,
    isLoading,
    handleSelectAllUsers,
    handleSingleUserSelect,
    handleEditClick,
  });

  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setSelectedUserForEdit(null);
  };

  const handleDeletePopupOpen = () => {
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  const getUpdatedUsers = async () => {
    setSelectedUsers([]);
    await getAllUsersFromBackend({
      search: debouncedSearchValue,
      page,
      append: false,
      pageSize,
    });
  };
  const handleDeleteProject = async () => {
    await deleteUser(selectedUsers, false, getUpdatedUsers);
    setDeletePopupOpen(false);
  };

  return (
    <>
      <ConfirmationPopup
        title={"Delete Users"}
        handleClose={handleDeletePopupClose}
        open={selectedUsers?.length > 0 && deletePopupOpen}
        message={msgForDeleteUser}
        type={"delete"}
        submitAction={handleDeleteProject}
        loading={loadingDeleteUser}
      />
      <EditUserPopup
        open={openEditPopup}
        handleClose={handleCloseEditPopup}
        title={"Update user"}
        user={selectedUserForEdit}
        setData={setData}
      />
      <Box position={"relative"}>
        {selectedUsers?.length > 0 && (
          <Box
            display={"flex"}
            sx={{
              background: "#C8FAD6",
              pl: 1,
              pr: 2,
              top: "0px",
              left: "0px",
              zIndex: 9,
              minHeight: isDownXs ? 45 : 58,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              p: isDownXs ? "12px 16px" : 2,
            }}
          >
            <Box
              sx={{
                borderColor: "transparent",
                fontSize: { xs: 12, sm: 13, lg: 14 },
                color: "#637381",
                fontWeight: 600,
                background: "inherit",
                width: "40px",
                minWidth: "40px",
              }}
            >
              {columns[0]?.label}
            </Box>
            <Box flexGrow={1}>
              <Typography
                color="#00A76F"
                fontWeight={600}
                ml={2}
                sx={{ fontSize: { xs: 12, sm: 13, lg: 14 } }}
              >
                {`${selectedUsers?.length || 0} selected`}
              </Typography>
            </Box>
            <IconButton
              onClick={handleDeletePopupOpen}
              sx={{
                padding: 1,
                borderRadius: "50%",
                flex: "0 0 auto",
              }}
            >
              <img
                src="/deleteIcon.svg"
                alt="delete"
                style={{
                  width: isDownXs ? "18px" : "22px",
                  height: isDownXs ? "18px" : "22px",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </Box>
        )}
        <MyTable
          columns={columns}
          rows={data}
          fetchMore={({ page, limit }) => {
            setSelectedUsers([]);
            if (limit !== pageSize) {
              handlePageSizeChange(limit);
            } else {
              setPage(page);
            }
          }}
          totalCount={totalUsers}
          selectedRows={selectedUsers}
          isLoading={loadingAllUsers || !hasFetchedOnce}
          isAllRowSelected={isAllRowSelected}
        />
      </Box>
    </>
  );
};
export default TableUser;
