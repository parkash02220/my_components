const defaultCalendarStyle = ({ isXs, fontSize, calendarDaySize }) => ({
    width: isXs ? "100%" : 320,
  
    "& .MuiPickersArrowSwitcher-button": {
      padding: "6px",
      "& svg": {
        fontSize: isXs ? "20px" : "24px",
      },
    },
  
    "& .MuiPickersCalendarHeader-label": {
      fontSize: fontSize,
      fontWeight: 600,
    },
  
    "& .MuiPickersDay-dayWithMargin": {
      fontSize: isXs ? "10px" : "12px",
    },
  
    "& .MuiPickersDay-root.Mui-selected": {
      backgroundColor: "#00A76F !important",
      color: "#fff",
      width: calendarDaySize,
      height: calendarDaySize,
      borderRadius: "50%",
      // margin: "0 auto",
    },
  
    "& .MuiPickersDay-root.MuiPickersDay-today": {
      border: "1px solid #00A76F",
      width: calendarDaySize,
      height: calendarDaySize,
      borderRadius: "50%",
      // margin: "0 auto",
    },
  
    "& .MuiPickersDay-root:hover": {
      backgroundColor: "rgba(0,167,111,0.08)",
    },
  });
  
  export default defaultCalendarStyle;
  