import useGetChatWindowUsers from "@/hooks/chat/useGetChatWindowUsers";
import { getFullName } from "@/utils";
import { useMemo, useState } from "react";

const { default: useGetAllUsers } = require("@/hooks/user/useGetAllUsers");
const { default: MyAutoComplete } = require("./MyAutoComplete");
const { Typography, Chip } = require("@mui/material");

const MyAutoCompleteVarient = ({selectedUsers,setSelectedUsers,type}) => {
    if(type ==="user"){
        const {
          users,
          loading,
          loadingMore,
          error,
          getChatroomsAndUsers,
          loadMoreRef,
          hasMore,
          page,
          searchValue,
          debouncedSearchValue,
          handleSearchClear,
          handleSearchValueChange,
          setSearchValue,
          resetAllStates,
        } = useGetChatWindowUsers();
        
        
          const filteredUsers = useMemo(() => {
            return users?.filter(
              (user) =>
                !selectedUsers?.some((selectedUser) => selectedUser?.id === user?.id)
            );
          }, [users, selectedUsers]);
        
          const handleUserSelect = (_, newValue) => {
            setSelectedUsers(newValue);
          };
        
          const handleSearchUser = (event, inputValue) => {
            handleSearchValueChange(event);
          };
        
          // const handleAutoCompleteClose = () => {
          //   handleSearchClear();
          // };
          return (
            <>
              <MyAutoComplete
                fullWidth={true}
                multiple={true}
                value={selectedUsers}
                loading={loading}
                options={filteredUsers}
                filterOptions={(options) => options}
                getOptionLabel={(option) =>
                  getFullName(option?.firstName, option?.lastName)
                }
                renderOption={(props, option) => {
                  const { key, ...rest } = props;
                  return (
                    <li
                    key={option?.id || key}
                      {...rest}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={option.avatar || "/dummyUser.svg"}
                        alt={option.firstName}
                        referrerPolicy="no-referrer"
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>
                        {getFullName(option.firstName, option.lastName)}
                      </Typography>
                    </li>
                  );
                }}
                renderTags={(value, getTagProps) => {
                  const visibleTags = value.slice(0, 3);
                  return [
                    ...visibleTags.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          key={option?.id || key} // prioritize your own unique key
                          label={getFullName(option?.firstName, option?.lastName)}
                          {...tagProps}
                        />
                      );
                    }),
                    value.length > 3 && (
                      <Typography key="more" fontSize={14}>
                        +{value.length - 3} more
                      </Typography>
                    ),
                  ];
                }}
                onChange={(_, newValue) => {
                  handleUserSelect(_, newValue);
                }}
                onInputChange={(event, inputValue) =>
                  handleSearchUser(event, inputValue)
                }
                loadMoreRef={loadMoreRef}
                hasMore={hasMore}
                loadingMore={loadingMore}
                label={"Select users"}
                fontSize={14}
                labelFontSize={14}
                // onClose={handleAutoCompleteClose}
                borderColor={'#ccc'}
                hoverBorderColor={'#1C252E'}
                focusedBorder={'2px solid #1C252E'}
              />
            </>
          );
    }
    return ""
};
export default MyAutoCompleteVarient;
