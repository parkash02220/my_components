import { ListItem } from "@mui/material";
import MySearch from "../MySearch/MySearch";

const SearchNavItem = ({ open, value, onChange, handleSearchClear }) => {
  return (
    <>
      {open ? (
        <ListItem sx={{ p: 0, py: 2 }}>
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
          />
        </ListItem>
      ) : null}
    </>
  );
};
export default SearchNavItem;
