import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

let theme = createTheme({
  palette,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components,
});

theme.typography = {
  ...theme.typography,
  ...typography(theme),
};

export default theme;
