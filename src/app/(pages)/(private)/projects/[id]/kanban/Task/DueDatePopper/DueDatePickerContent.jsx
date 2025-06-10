import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import MyButton from "@/components/MyButton/MyButton";

export default function DueDatePickerContent({
  taskStartDate,
  taskEndDate,
  onCancel,
  onApply,
  loading,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (taskStartDate) setStartDate(dayjs(taskStartDate));
    if (taskEndDate) setEndDate(dayjs(taskEndDate));
  }, [taskStartDate, taskEndDate]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (endDate && newValue.isAfter(endDate)) {
      setDateError("Start date cannot be after end date");
    } else {
      setDateError("");
    }
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    if (startDate && startDate.isAfter(newValue)) {
      setDateError("End date cannot be before start date");
    } else {
      setDateError("");
    }
  };

  const handleApply = () => {
    const startD = startDate ? startDate.format("YYYY-MM-DD") : "";
    const endD = endDate ? endDate.format("YYYY-MM-DD") : "";
    onApply(startD, endD);
  };

  return (
    <Box p={2} width="fit-content">
      <Box display="flex" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={startDate}
            onChange={handleStartDateChange}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            sx={calendarStyles}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={endDate}
            onChange={handleEndDateChange}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            sx={calendarStyles}
          />
        </LocalizationProvider>
      </Box>
      {dateError && (
        <Typography color="#FF5630" fontSize={12} mt={1}>
          {dateError}
        </Typography>
      )}
      <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
        <MyButton
          onClick={onCancel}
          variant="outlined"
          padding="5px 12px"
          borderRadius="8px"
          fontSize={14}
          border="1px solid rgba(145,158,171,0.32)"
          color="#1C252E"
          minWidth="100px"
          hoverBgColor="whitesmoke"
        >
          Cancel
        </MyButton>
        <MyButton
          onClick={handleApply}
          disabled={!!dateError || !startDate || !endDate}
          loading={loading}
          loadingText="Applying..."
          fontSize={14}
          padding="5px 12px"
          borderRadius="8px"
          minWidth="100px"
          hoverBgColor="#1C252E"
        >
          Apply
        </MyButton>
      </Box>
    </Box>
  );
}

const calendarStyles = {
  "& .MuiPickersDay-dayWithMargin": { fontSize: "12px" },
  "& .Mui-selected": {
    backgroundColor: "#00A76F !important",
    color: "#fff",
  },
  "& .MuiPickersDay-root:hover": {
    backgroundColor: "rgba(0,167,111,0.08)",
  },
};
