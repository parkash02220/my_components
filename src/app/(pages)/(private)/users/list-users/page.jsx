"use client";
import React, { useEffect, useState } from "react";
import MyTable from "@/components/MyTable";
import useGetAllUsers from "@/hooks/projects/user/useGetAllUsers";
import { getFullName } from "@/utils";
import EditUserPopup from "./EditUserPopup";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import SelectUserRole from "../components/SelectUserRole";
import TableUser from "../components/TableUser";
import SearchUser from "../components/SearchUser";
import MyMenu from "@/components/MyMenu";
const ListUsers = () => {
  const { isXs, isMd } = useBreakpointFlags();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
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

  console.log("::data", data);

  console.log("::selected user in table", selectedUsers);
  const menuItems = [
    {
      label: "Print",
      icon: "/printIcon.svg",
      onClick: ()=>{
        console.log("::print button clicked")
        handleMenuClose();
      } 
    },
    {
      label: "Import",
      icon: "/importIcon.svg",
      onClick: ()=>{
        console.log("::import button clicked")
        handleMenuClose();
      } 
    },
    {
      label: "Export",
      icon: "/exportIcon.svg",
      onClick: ()=>{
        console.log("::export button clicked")
        handleMenuClose();
      },
    },
  ];
  return (
    <>
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
          {" "}
          <Box
            p={"20px 8px 20px 20px"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <Box width={200} flexShrink={0}>
              <SelectUserRole />
            </Box>
            <Box flexGrow={1}>
              <SearchUser
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearchValueChange={handleSearchValueChange}
              />
            </Box>
            <Box>
                <IconButton onClick={handleMenuOpen} sx={{
                  padding:1,
                  borderRadius:"50%",
                  color:"#637381",
                  '&:hover':{
                    background:"rgba(99,115,129,0.08)",
                  }
                }}>
                  <img src="/menuVerticalIcon.svg" alt="menu" style={{width:'20px',height:"20px"}} />
                </IconButton>
                <MyMenu 
                type={'list_user'}
                options={menuItems}
                menuAnchorEl={menuAnchorEl}
                onClose={handleMenuClose}

                />
              </Box>
          </Box>
          <TableUser
            data={data}
            setData={setData}
            setPage={setPage}
            setPageSize={setPageSize}
            getAllUsersFromBackend={getAllUsersFromBackend}
            totalUsers={totalUsers}
            selectedUsers={selectedUsers}
            loadingAllUsers={loadingAllUsers}
            page={page}
            setSelectedUsers={setSelectedUsers}
            debouncedSearchValue={debouncedSearchValue}
          />
        </Box>
      </Box>
    </>
  );
};
export default ListUsers;
