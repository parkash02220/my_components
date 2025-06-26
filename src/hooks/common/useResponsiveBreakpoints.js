import { useTheme, useMediaQuery } from "@mui/material";

const useResponsiveBreakpoints = () => {
  const theme = useTheme();
  const { breakpoints } = theme;
  const keys = breakpoints.keys;

  const matches = {
    xs: useMediaQuery(`(min-width:${breakpoints.values.xs}px)`, {
      noSsr: true,
    }),
    sm: useMediaQuery(`(min-width:${breakpoints.values.sm}px)`, {
      noSsr: true,
    }),
    md: useMediaQuery(`(min-width:${breakpoints.values.md}px)`, {
      noSsr: true,
    }),
    lg: useMediaQuery(`(min-width:${breakpoints.values.lg}px)`, {
      noSsr: true,
    }),
    xl: useMediaQuery(`(min-width:${breakpoints.values.xl}px)`, {
      noSsr: true,
    }),
  };

  const current = [...keys].reverse().find((key) => matches[key]) || "xs";

  const currentIndex = keys.indexOf(current);

  const upwardFlags = keys.reduce((acc, key, index) => {
    acc[`is${capitalize(key)}`] = index >= currentIndex;
    return acc;
  }, {});

  const directionFlags = keys.reduce((acc, key, index) => {
    acc[`isUp${capitalize(key)}`] = currentIndex >= index;
    acc[`isDown${capitalize(key)}`] = currentIndex <= index;
    return acc;
  }, {});

  return {
    current,
    ...upwardFlags,
    ...directionFlags,
  };
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default useResponsiveBreakpoints;
