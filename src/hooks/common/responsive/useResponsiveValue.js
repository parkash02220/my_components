import { useMemo } from "react";
import useResponsiveBreakpoints from "../useResponsiveBreakpoints";
import DEFAULTS from "./defaultValues";
import {BREAKPOINT_ORDER} from "./defaultValues"; 



const getResponsiveValue = (map, current) => {
  const currentIndex = BREAKPOINT_ORDER.indexOf(current);

  for (let i = currentIndex; i >= 0; i--) {
    const key = BREAKPOINT_ORDER[i];
    if (map[key] !== undefined) {
      return map[key];
    }
  }

  return undefined;
};

const useResponsiveValue = () => {
  const { current: currentBreakpoint } = useResponsiveBreakpoints();

  const values = useMemo(() => {
    const output = {};
    for (const key in DEFAULTS) {
      output[key] = getResponsiveValue(DEFAULTS[key], currentBreakpoint);
    }
    return output;
  }, [currentBreakpoint]);

  return values;
};

export default useResponsiveValue;
