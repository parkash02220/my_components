"use client";
import React, { useEffect, useMemo, useState } from "react";
import MyTable from "@/components/MyTable";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { getFullName } from "@/utils";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import SelectUserDesignation from "../components/SelectUserDesignation";
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
    loadingMoreAllUsers,
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
    pageSize,
    hasFetchedOnce,
    handlePageSizeChange,
    resetStates,
    designations,
    setDesignations,
  } = useGetAllUsers("all", "table");

  const enhancedUsers = useMemo(() => {
    return allUsers.map((user) => ({
      ...user,
      nameWithAvatar: {
        name: getFullName(user?.firstName, user?.lastName),
        avatar: user?.avatar || "",
      },
      isSelected: selectedUsers.some((u) => u.id === user.id),
      designation: user?.userProfile?.designation?.name,
    }));
  }, [allUsers, selectedUsers]);
  const menuItems = [
    {
      label: "Print",
      icon: "/printIcon.svg",
      onClick: () => {
        console.log("::print button clicked");
        handleMenuClose();
      },
    },
    {
      label: "Import",
      icon: "/importIcon.svg",
      onClick: () => {
        console.log("::import button clicked");
        handleMenuClose();
      },
    },
    {
      label: "Export",
      icon: "/exportIcon.svg",
      onClick: () => {
        console.log("::export button clicked");
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
              <SelectUserDesignation
                designations={designations}
                setDesignations={setDesignations}
              />
            </Box>
            <Box flexGrow={1}>
              <SearchUser
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearchValueChange={handleSearchValueChange}
                resetStates={resetStates}
              />
            </Box>
            <Box>
              {/* <IconButton onClick={handleMenuOpen} sx={{
                  padding:1,
                  borderRadius:"50%",
                  color:"#637381",
                  '&:hover':{
                    background:"rgba(99,115,129,0.08)",
                  }
                }}>
                  <img src="/menuVerticalIcon.svg" alt="menu" style={{width:'20px',height:"20px"}} />
                </IconButton> */}
              <MyMenu
                type={"list_user"}
                options={menuItems}
                menuAnchorEl={menuAnchorEl}
                onClose={handleMenuClose}
              />
            </Box>
          </Box>
          <TableUser
            data={enhancedUsers}
            setData={setAllUsers}
            setPage={setPage}
            setPageSize={setPageSize}
            getAllUsersFromBackend={getAllUsersFromBackend}
            totalUsers={totalUsers}
            selectedUsers={selectedUsers}
            loadingAllUsers={loadingAllUsers}
            page={page}
            setSelectedUsers={setSelectedUsers}
            debouncedSearchValue={debouncedSearchValue}
            pageSize={pageSize}
            hasFetchedOnce={hasFetchedOnce}
            handlePageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Box>
    </>
  );
};
export default ListUsers;
