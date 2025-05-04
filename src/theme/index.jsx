import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

const theme = createTheme({
  palette,
  typography,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components,
});

export default theme;
