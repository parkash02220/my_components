const responsiveFontSize = (theme, xs, sm, md, lg) => ({
  fontSize: lg,
  [theme.breakpoints.up("xs")]: { fontSize: xs },
  [theme.breakpoints.up("sm")]: { fontSize: sm },
  [theme.breakpoints.up("md")]: { fontSize: md },
  [theme.breakpoints.up("lg")]: { fontSize: lg },
});

const createTextVariant = (theme, color, xs, sm, md, lg, weight = 400) => ({
  color,
  fontWeight: weight,
  ...responsiveFontSize(theme, xs, sm, md, lg),
});

const typography = (theme) => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

  title1: createTextVariant(
    theme,
    theme?.palette?.primary?.main,
    "16px",
    "16px",
    "20px",
    "20px",
    600
  ),

  title2: createTextVariant(
    theme,
    theme?.palette?.primary?.main,
    "13px",
    "14px",
    "16px",
    "16px"
  ),

  title: createTextVariant(
    theme,
    theme?.palette?.primary?.main,
    "14px",
    "15px",
    "16px",
    "18px"
  ),
  primary: createTextVariant(
    theme,
    theme?.palette?.primary?.main,
    "12px",
    "13px",
    "13px",
    "14px"
  ),
  secondary: createTextVariant(
    theme,
    theme?.palette?.secondary?.main,
    "12px",
    "13px",
    "13px",
    "14px"
  ),
  disabled: createTextVariant(
    theme,
    theme?.palette?.disabled?.main,
    "12px",
    "13px",
    "13px",
    "14px"
  ),
});

export default typography;
