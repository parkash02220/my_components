const responsiveFontSize = (theme,xs, sm, md, lg) => ({
  fontSize: lg,
  [theme.breakpoints.up("xs")]: { fontSize: xs },
  [theme.breakpoints.up("sm")]: { fontSize: sm },
  [theme.breakpoints.up("md")]: { fontSize: md },
  [theme.breakpoints.up("lg")]: { fontSize: lg },

});

const createTextVariant = (theme, color,xs, sm, md, lg, weight = 400) => ({
  color,
  fontWeight: weight,
  ...responsiveFontSize(theme,xs, sm, md, lg),
});

const typography = (theme) => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

  h1: { fontSize: "2rem", fontWeight: 700 },
  h2: createTextVariant(theme, "#1C252E", "16px", "20px", "24px",700),

  title: createTextVariant(theme, "#1C252E", "13px", "14px","15px", "16px"),
  primary: createTextVariant(theme, "#1C252E", "12px", "13px","13px", "14px"),
  secondary: createTextVariant(theme, "#637381", "12px", "13px","13px", "14px"),
  disabled: createTextVariant(theme, "#919EAB","12px", "13px","13px", "14px"), 
});

export default typography;
