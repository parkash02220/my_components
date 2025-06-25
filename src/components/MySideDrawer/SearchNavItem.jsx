import { ListItem } from "@mui/material";
import MySearch from "../MySearch/MySearch";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";

const SearchNavItem = ({ open, value, onChange, handleSearchClear }) => {
  const { isXs } = useBreakpointFlags();
  const fontSize = useResponsiveValue("fontSize");
  const iconSize = useResponsiveValue("iconSize");
 console.log(":::iconSize",iconSize)
  return (
    <>
      {open ? (
        <ListItem sx={{ p: 0, py: isXs ? 1 : 2 }}>
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
