import { Box } from "@mui/material";
import UserDetails from "./UserDetails";
import HeaderIconButtons from "./HeaderIconButtons";

const Header = ({toggleExpand}) => {
    return <>
    <Box height={72} flexShrink={0} display={'flex'} alignItems={'center'} padding={'8px 8px 8px 20px'} borderBottom={'1px solid rgba(145,158,171,0.2)'}>
        <UserDetails />
        <HeaderIconButtons toggleExpand={toggleExpand} />
    </Box>
    </>
}
export default Header;