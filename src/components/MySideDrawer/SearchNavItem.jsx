import { ListItem } from "@mui/material";
import MySearch from "../MySearch/MySearch";
import useSearchProject from "@/hooks/projects/useSearchProject";

const SearchNavItem = ({open}) => {
    const {loadingSearchProject,errorSearchProject,helperTextSearchProject,searchInputValue,handleSearchInputChange,setSearchInputValue} = useSearchProject();
    return <>
    {open ? (
    <ListItem>
      <MySearch 
      fullWidth
       minWidth="100px"
       borderRadius="10px"
       placeholder="Search projects..."
       focusedBorderColor="rgb(0,0,0)"
       hoverBorderColor="rgb(0,0,0)"
       value={searchInputValue}
       onChange={handleSearchInputChange}
       onClear={()=>setSearchInputValue("")}
       loading={loadingSearchProject}
      />
    </ListItem>
  ) : null
}
    </>
}
export default SearchNavItem;