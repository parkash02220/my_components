"use client";
const { ThemeProvider, CssBaseline } = require("@mui/material")
const { default: theme } = require(".")

const CustomThemeProvider = ({children}) => {
    return <>
    <ThemeProvider theme={theme}>
     {children}
    </ThemeProvider>
    </>
}

export default CustomThemeProvider;