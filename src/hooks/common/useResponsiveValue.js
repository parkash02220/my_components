import useResponsiveBreakpoints from "./useResponsiveBreakpoints";

const BREAKPOINT_ORDER = ["xs", "sm", "md", "lg", "xl"];

const DEFAULTS = {
  fontSize: {
    xs: "12px",
    sm: "13px",
    lg: "14px",
  },
  iconSize: {
    xs: "18px",
    sm: "20px",
    md: "22px",
    lg: "24px",
  },
};

const useResponsiveValue = (type, overrides = {}) => {
  const { current: currentBreakpoint } = useResponsiveBreakpoints();

  const defaults = DEFAULTS[type] || {};
  const merged = { ...defaults, ...overrides };

  const currentIndex = BREAKPOINT_ORDER.indexOf(currentBreakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    const key = BREAKPOINT_ORDER[i];
    if (merged[key] !== undefined) {
      return merged[key];
    }
  }

  return undefined;
};

export default useResponsiveValue;
