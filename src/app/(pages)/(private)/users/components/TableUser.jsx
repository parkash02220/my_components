import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EditUserPopup from "../list-users/EditUserPopup";
import MyTable from "@/components/MyTable";

const TableUser = ({
  data,
  setData,
  setPage,
  setPageSize,
  getAllUsersFromBackend,
  totalUsers,
  selectedUsers,
  loadingAllUsers,
  page,
  setSelectedUsers,
  debouncedSearchValue,
}) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [isAllUserSelected,setIsAllUserSelected] = useState(false);
  const handleSelectAllUsers = (checked) => {
    if (checked) {
      setSelectedUsers(data);
      setIsAllUserSelected(true);
    } else {
      setSelectedUsers([]);
      setIsAllUserSelected(false);
    }
  };
  const handleSingleUserSelect = (e, row) => {
    console.log("::e and row", e, row);
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
    console.log("::Edit:", row);
    setSelectedUserForEdit(row);
    handleOpenEditPopup();
  };
  const handleMenuClick = (e, row) => {
    console.log("::menu click", row);
  };
  const columns = [
    {
      id: "isSelected",
      label: (
        <Box>
          {" "}
          <Checkbox
            indeterminate={
              selectedUsers.length > 0 && !isAllUserSelected
            }
            checked={
             isAllUserSelected
            }
            onChange={(e) => handleSelectAllUsers(e.target.checked)}
          />
        </Box>
      ),
      type: "checkbox",
      onChange: handleSingleUserSelect,
      align: "center",
      sx: { width: "40px", minWidth: "40px", maxWidth: "40px" },
    },
    { id: "nameWithAvatar", label: "Name", type: "avatarText" },
    { id: "email", label: "Email", type: "text" },
    { id: "role", label: "Role", type: "text" },
    // {
    //   id: 'edit',
    //   label: '',
    //   type: 'iconButton',
    //   icon: 'edit',
    //   tooltip: 'Edit Task',
    //   onClick: handleEditClick
    // },
    {
      id: "edit_menu",
      label: "",
      type: "multipleIconButton",
      icons: [
        { icon: "edit", onClick: handleEditClick, tooltip: "Edit Task" },
        { icon: "menu", onClick: handleMenuClick, tooltip: "menu" },
      ],
      sx: { minWidth: "40px", maxWidth: "50px", padding: "4px" },
    },
  ];
  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setSelectedUserForEdit(null);
  };
  return (
    <>
      <EditUserPopup
        open={openEditPopup}
        handleClose={handleCloseEditPopup}
        title={"Update user"}
        user={selectedUserForEdit}
        setData={setData}
      />
      <Box position={'relative'}>
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
              minHeight: 58,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              p: 2,
            }}
          >
            <Box
              sx={{
                borderColor: "transparent",
                fontSize: "14px",
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
              <Typography color="#00A76F" fontSize={14} fontWeight={600} ml={2}>
                {isAllUserSelected ? totalUsers : selectedUsers?.length || 0} selected
              </Typography>
            </Box>
            <IconButton
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
                  width: "22px",
                  height: "22px",
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
            setPage(page);
            setPageSize(limit);
            getAllUsersFromBackend({
              page,
              search: debouncedSearchValue,
              append: false,
              pageSize: limit,
            });
          }}
          totalCount={totalUsers}
          selectedRows={selectedUsers}
          isLoading={loadingAllUsers || page === 0}
          isAllRowSelected={isAllUserSelected}
        />
      </Box>
    </>
  );
};
export default TableUser;
