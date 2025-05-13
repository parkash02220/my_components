"use client";
import React, { useEffect, useState } from "react";
import MyTable from "@/components/MyTable";
import useGetAllUsers from "@/hooks/projects/user/useGetAllUsers";
import { getFullName } from "@/utils";
import EditUserPopup from "./EditUserPopup";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
const ListUsers = () => {
  const { isXs, isMd } = useBreakpointFlags();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    getAllUsersFromBackend,
    handleSearchValueChange,
    setSearchValue,
    setPage,
    loadMoreRef,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
    hasMore,
    page,
    setPageSize,
  } = useGetAllUsers("all", "table");
  const [data, setData] = useState([]);

  useEffect(() => {
    const usersWithUpdatedKeys = allUsers.map((user) => {
      const isSelected = selectedUsers.some((u) => u.id === user.id);
      return {
        ...user,
        nameWithAvatar: {
          name: getFullName(user?.firstName, user?.lastName),
          avatar: user?.avatar || "",
        },
        isSelected: isSelected,
      };
    });
    setData(usersWithUpdatedKeys);
  }, [allUsers, selectedUsers]);
  console.log("::all users", allUsers);
  const handleSelectAllUsers = (checked) => {
    if (checked) {
      setSelectedUsers(allUsers);
    } else {
      setSelectedUsers([]);
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
  console.log("::data", data);
  const columns = [
    {
      id: "isSelected",
      label: (
        <Box>
          {" "}
          <Checkbox
            indeterminate={
              selectedUsers.length > 0 && selectedUsers.length < allUsers.length
            }
            checked={
              allUsers.length > 0 && selectedUsers.length === allUsers.length
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
  console.log("::selected user in table", selectedUsers);
  return (
    <>
      <EditUserPopup
        open={openEditPopup}
        handleClose={handleCloseEditPopup}
        title={"Update user"}
        user={selectedUserForEdit}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px 40px 64px 40px",
        }}
      >
        <Box
          sx={{
            marginInline: "auto",
            maxWidth: "1200px",
            flex: "1 1 auto",
            overflow: "hidden",
            borderRadius: 2,
            zIndex: 0,
            boxShadow:
              "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
            position: "relative",
            background: "#FFFFFF",
            color: "#1C252E",
          }}
        >
          <Box>
            {
              <Box
                display={"flex"}
                sx={{
                  background: "#C8FAD6",
                  pl: 1,
                  pr: 2,
                  top: "0px",
                  left: "0px",
                  zIndex: 9,
                  height: 58,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent:'center',
                  width: "100%",
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
                  <Typography
                    color="#00A76F"
                    fontSize={14}
                    fontWeight={600}
                    ml={2}
                  >
                    {selectedUsers?.length || 0} selected
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
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </IconButton>
              </Box>
            }
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
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ListUsers;
