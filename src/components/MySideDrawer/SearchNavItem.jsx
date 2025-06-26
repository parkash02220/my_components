import { ListItem } from "@mui/material";
import MySearch from "../MySearch/MySearch";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const SearchNavItem = ({ open, value, onChange, handleSearchClear }) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const fontSize = useResponsiveValue("fontSize");
  const iconSize = useResponsiveValue("iconSize");
  return (
    <>
      {open ? (
        <ListItem sx={{ p: 0, py: isDownXs ? 1 : 2 }}>
          <MySearch
            fullWidth
            minWidth="100px"
            borderRadius="10px"
            placeholder="Search projects..."
            hoverBorderColor={"#1C252E"}
            focusedBorder="2px solid #1C252E"
            value={value}
            onChange={onChange}
            onClear={() => handleSearchClear()}
            inputFontSize={fontSize}
            iconStyle={{
              width: iconSize,
              height: iconSize,
            }}
          />
        </ListItem>
      ) : null}
    </>
  );
};
export default SearchNavItem;
