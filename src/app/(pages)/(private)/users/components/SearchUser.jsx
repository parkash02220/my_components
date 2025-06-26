import MySearch from "@/components/MySearch/MySearch";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";

export default function SearchUser({
  searchValue,
  setSearchValue,
  handleSearchValueChange,
  resetStates,
}) {
  const theme = useTheme();
  const fontSize = useResponsiveValue("fontSize");
  const iconSize = useResponsiveValue("iconSize");
  const handleSearchClear = () => {
    resetStates();
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
          inputFontSize={fontSize}
          iconStyle={{ width: iconSize, height: iconSize }}
        />
      </Box>
    </>
  );
}
