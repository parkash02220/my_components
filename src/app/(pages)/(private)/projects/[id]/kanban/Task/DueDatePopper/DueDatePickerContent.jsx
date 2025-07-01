import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import MyButton from "@/components/MyButton/MyButton";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import defaultCalendarStyle from "../../Drawer/OverviewTab/DueDateDialog/calendarStyle";

export default function DueDatePickerContent({
  taskStartDate,
  taskEndDate,
  onCancel,
  onApply,
  loading,
}) {
  const { isXs, isSm, isMd, isLg } = useResponsiveBreakpoints();
  const { fontSize, calendarDaySize } = useResponsiveValue();
  const calendarStyles = defaultCalendarStyle({
    isXs,
    fontSize,
    calendarDaySize,
  });
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
    <Box
      p={isXs ? 0 : 2}
      width="fit-content"
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        className="calendar__box"
        padding={"8px 0px 8px 0px"}
        display={"flex"}
        gap={isXs ? 2 : 3}
        justifyContent={isXs ? "center" : "space-between"}
        flexDirection={isXs ? "column" : "row"}
      >
        <Box
          className="start_dueDate"
          borderRadius={1}
          border={"1px dashed rgba(145,158,171,0.2)"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={startDate}
              onChange={handleStartDateChange}
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              slotProps={{
                day: {
                  sx: {
                    fontSize: isXs ? "10px" : "12px",
                    width: calendarDaySize,
                    height: calendarDaySize,
                  },
                },
              }}
              sx={calendarStyles}
            />
          </LocalizationProvider>
        </Box>
        <Box
          className="end_dueDate"
          borderRadius={1}
          border={"1px dashed rgba(145,158,171,0.2)"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={endDate}
              onChange={handleEndDateChange}
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              slotProps={{
                day: {
                  sx: {
                    fontSize: isXs ? "10px" : "12px",
                    width: calendarDaySize,
                    height: calendarDaySize,
                  },
                },
              }}
              sx={calendarStyles}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      {dateError && (
        <Typography color="#FF5630" fontSize={isXs ? 10 : 12} mt={1}>
          {dateError}
        </Typography>
      )}
      <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
        <MyButton
          onClick={onCancel}
          variant="outlined"
          padding="5px 12px"
          borderRadius="8px"
          fontSize={fontSize}
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
          fontSize={fontSize}
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