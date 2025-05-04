import { useTheme, useMediaQuery } from "@mui/material";

const useBreakpointFlags = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isLg = useMediaQuery(theme.breakpoints.down("xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
};

export default useBreakpointFlags;
