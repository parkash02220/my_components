import { Box } from "@mui/material";
import SingleUserDetails from "./SingleUserDetails";
import HeaderIconButtons from "./HeaderIconButtons";
import GroupUsersDetails from "./GroupUsersDetails";
import InitialHeader from "./InitialHeader";
import { useMemo } from "react";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { useChatContext } from "@/context/Chat/ChatContext";

const Header = ({ toggleExpand, selectedUsers, setSelectedUsers,status }) => {
  const {activeChatRoom} = useChatContext()?.state;
  const isGroup = activeChatRoom?.isGroup;
  const hasSelectedItem = Boolean(activeChatRoom);
  const {isXs} = useResponsiveBreakpoints();
  const HeaderContent = useMemo(() => {
    if (!hasSelectedItem || status === "error") {
      return (
        <InitialHeader
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      );
    }

    return isGroup ? (
      <GroupUsersDetails groupDetails={activeChatRoom} />
    ) : (
      <SingleUserDetails userDetails={activeChatRoom} />
    );
  }, [hasSelectedItem, isGroup, selectedUsers, setSelectedUsers, activeChatRoom]);

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
        />
      )}
    </Box>
  );
};

export default Header;
