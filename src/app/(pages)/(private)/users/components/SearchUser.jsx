import MySearch from "@/components/MySearch/MySearch";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";

export default function SearchUser({
  searchValue,
  setSearchValue,
  handleSearchValueChange,
}) {
  const theme = useTheme();
  const handleSearchClear = () => {
    setSearchValue("");
    setPage(1);
  };
  return (
    <>
      <Box className="user__searchBox" width={"100%"}>
        <MySearch
          fullWidth={true}
          borderRadius="8px"
          hoverBorderColor={theme.palette.primary.main}
          focusedBorder={`2px solid ${theme.palette.primary.main}`}
          value={searchValue}
          onChange={handleSearchValueChange}
          onClear={handleSearchClear}
          minWidth="0px"
          padding={"7px"}
          placeholder="Search user..."
        />
      </Box>
    </>
  );
}
