import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography, useTheme } from "@mui/material";
import MyDialog from "@/components/MyDialog/MyDialog";
import { useEffect, useState } from "react";
import MyButton from "@/components/MyButton/MyButton";
import dayjs from "dayjs";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import defaultCalendarStyle from './calendarStyle';
const DueDateDialog = ({
  open,
  handleClose,
  updateDueDate,
  taskStartDate,
  taskEndDate,
  loadingEditTask,
}) => {
  const { isXs, isSm, isMd, isLg } = useResponsiveBreakpoints();
  const { fontSize, calendarDaySize } = useResponsiveValue();
  const calendarStyles = defaultCalendarStyle({ isXs, fontSize, calendarDaySize });
  const theme = useTheme();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const formattedStartDate = startDate ? startDate.format("DD-MMM") : "";
  const formattedEndDate = endDate ? endDate.format("DD-MMM YYYY") : "";

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
  const handleDueDateApplyButton = async () => {
    const startD = startDate ? startDate.format("YYYY-MM-DD") : "";
    const endD = endDate ? endDate.format("YYYY-MM-DD") : "";
    await updateDueDate(startD, endD);
    handleClose();
  };
  useEffect(() => {
    if (taskStartDate) setStartDate(dayjs(taskStartDate));
    if (taskEndDate) setEndDate(dayjs(taskEndDate));
  }, [taskStartDate, taskEndDate]);
  return (
    <>
      <Box
        className="dueDateDialog__container"
        boxShadow={" -40px 40px 80px -8px rgba(0 0 0 / 0.24)"}
      >
        <MyDialog
          open={open}
          minwidth={"444px"}
          width={"calc(100% - 64px)"}
          maxwidth={"720px"}
          maxheight={`calc(100% - 64px)`}
          titlepadding="24px 24px 0px"
          contentpadding="0px !important"
          handleClose={handleClose}
          title={
            <Box
              className="dueDateDialog__title"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <Typography variant="title" fontWeight={600}>
                Select due date
              </Typography>
            </Box>
          }
          content={
            <Box className="dueDateDialog__contentBox" padding={"0px 24px"}>
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
                      onChange={(newValue) => handleStartDateChange(newValue)}
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
                      onChange={(newValue) => handleEndDateChange(newValue)}
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
              <Box>
                {dateError && (
                  <Typography color="#FF5630" fontSize={isXs ? 10 : 12}>
                    {dateError}
                  </Typography>
                )}
              </Box>
            </Box>
          }
          actions={
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              padding={3}
              gap={"12px"}
            >
              <MyButton
                fontWeight={700}
                minWidth="'64px"
                fontSize={fontSize}
                variant="outlined"
                color="#DFE3EB"
                backgroundColor="#FFFFFF"
                borderRadius="8px"
                padding={"5px 12px"}
                border={"1px solid rgba(145,158,171,0.32)"}
                onClick={handleClose}
              >
                Cancel
              </MyButton>
              <MyButton
                onClick={handleDueDateApplyButton}
                fontWeight={700}
                minWidth="'64px"
                fontSize={fontSize}
                color="#1C252E"
                backgroundColor="#FFFFFF"
                borderRadius="8px"
                padding={"5px 12px"}
                border={"1px solid rgba(145,158,171,0.32)"}
                disabled={!!dateError || !startDate || !endDate}
                loading={loadingEditTask}
                loadingText={"Applying..."}
              >
                Apply
              </MyButton>
            </Box>
          }
        />
      </Box>
    </>
  );
};
export default DueDateDialog;
