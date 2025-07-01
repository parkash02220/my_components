import { Box } from "@mui/material";
import SingleUserDetails from "./SingleUserDetails";
import HeaderIconButtons from "./HeaderIconButtons";
import GroupUsersDetails from "./GroupUsersDetails";
import InitialHeader from "./InitialHeader";
import { useMemo } from "react";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const Header = ({ toggleExpand, selectedDirectoryItem, selectedUsers, setSelectedUsers }) => {
  const isGroup = selectedDirectoryItem?.isGroup;
  const hasSelectedItem = Boolean(selectedDirectoryItem);
  const {isXs} = useResponsiveBreakpoints();
  const HeaderContent = useMemo(() => {
    if (!hasSelectedItem) {
      return (
        <InitialHeader
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      );
    }

    return isGroup ? (
      <GroupUsersDetails groupDetails={selectedDirectoryItem} />
    ) : (
      <SingleUserDetails userDetails={selectedDirectoryItem} />
    );
  }, [hasSelectedItem, isGroup, selectedUsers, setSelectedUsers, selectedDirectoryItem]);

  return (
    <Box
      minHeight={isXs ? 64 : 72}
      flexShrink={0}
      display="flex"
      alignItems="center"
      padding={ isXs ? '8px' : "8px 8px 8px 20px"}
      borderBottom="1px solid rgba(145,158,171,0.2)"
    >
      {HeaderContent}

      {hasSelectedItem && (
        <HeaderIconButtons
          toggleExpand={toggleExpand}
          selectedDirectoryItem={selectedDirectoryItem}
        />
      )}
    </Box>
  );
};

export default Header;
