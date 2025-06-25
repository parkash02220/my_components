import useBreakpointFlags from "./useBreakpointsFlag";

const DEFAULTS = {
  fontSize: {
    xs: "12px",
    sm: "13px",
    md: "13px",
    lg: "14px",
    xl: "14px",
  },
  iconSize: {
    xs:"18px",
    sm:"20px",
    md:"22px",
    lg:"22px",
    xl:"24px",
  }
};

const useResponsiveValue = (type, overrides = {}) => {
    const { isXs, isSm, isMd, isLg, isXl } = useBreakpointFlags();
  
    const defaults = DEFAULTS[type] || {};
    const merged = {
      xs: overrides.xs ?? defaults.xs,
      sm: overrides.sm ?? defaults.sm,
      md: overrides.md ?? defaults.md,
      lg: overrides.lg ?? defaults.lg,
      xl: overrides.xl ?? defaults.xl,
    };
  
    if (isXs) return merged.xs;
    if (isSm) return merged.sm;
    if (isMd) return merged.md;
    if (isLg) return merged.lg;
    if (isXl) return merged.xl;
  
    return merged.md || merged.lg;
  };
  

export default useResponsiveValue;
