import { Box, Typography, useTheme } from "@mui/material";
import MyDialog from "../MyDialog/MyDialog";
import MyButton from "../MyButton/MyButton";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";

const ConfirmationPopup = ({
  title,
  handleClose,
  open,
  message,
  cancelText,
  submitText,
  cancelAction,
  submitAction,
  type,
  loading,
  loadingText,
}) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
  const theme = useTheme();
  if (type === "delete") {
    return (
      <>
        <MyDialog
          open={open}
          handleClose={handleClose}
          title={title}
          fontSize={isDownXs ? "14px" : "18px"}
          titlepadding="24px 24px 16px"
          contentpadding="0px 24px !important"
          actionpadding="24px !important"
          width={isDownXs ? "100%" : "auto"}
          content={
            <Box>
              <Typography variant="primary">
                Are you sure you want to delete{" "}
                <span style={{ fontWeight: 700 }}>{message}</span>?
              </Typography>
            </Box>
          }
          actions={
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1.5}
              width="100%"
              p={0}
            >
              <MyButton
                onClick={submitAction}
                variant="contained"
                loadingText={loadingText || "Deleting"}
                padding={"6px 12px"}
                minWidth="64px"
                fontWeight={700}
                fontSize={fontSize}
                color="#FFFFFF"
                borderRadius="8px"
                backgroundColor="#FF5630"
                hoverBgColor="red"
                loading={loading}
              >
                {submitText || "Delete"}
              </MyButton>
              <MyButton
                onClick={cancelAction ? cancelAction : handleClose}
                padding={"6px 12px"}
                minWidth="64px"
                fontWeight={700}
                color={theme?.palette?.primary?.main}
                borderRadius="8px"
                variant="outlined"
                fontSize={fontSize}
                hoverBgColor="whitesmoke"
              >
                {cancelText || "Cancel"}
              </MyButton>
            </Box>
          }
        />
      </>
    );
  } else if ((type = "logout")) {
    return (
      <>
        <MyDialog
          open={open}
          handleClose={handleClose}
          title={title}
          fontSize="18px"
          titlepadding="24px 24px 16px"
          contentpadding="0px 24px !important"
          actionpadding="24px !important"
          width={isDownXs ? "100%" : "auto"}
          content={
            <Box>
              <Typography fontSize={14} color={theme?.palette?.primary?.main}>
                Are you sure you want to logout ?
              </Typography>
            </Box>
          }
          actions={
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1.5}
              width="100%"
              p={0}
            >
              <MyButton
                onClick={submitAction}
                variant="contained"
                loadingText={loadingText || "Logging out"}
                padding={"6px 12px"}
                minWidth="64px"
                fontWeight={700}
                fontSize={14}
                borderRadius="8px"
                loading={loading}
                backgroundColor="#1C252E"
              >
                {submitText || "Logout"}
              </MyButton>
              <MyButton
                onClick={cancelAction ? cancelAction : handleClose}
                padding={"6px 12px"}
                minWidth="64px"
                fontWeight={700}
                color={theme?.palette?.primary?.main}
                borderRadius="8px"
                variant="outlined"
                fontSize={14}
                hoverBgColor="whitesmoke"
              >
                {cancelText || "Cancel"}
              </MyButton>
            </Box>
          }
        />
      </>
    );
  }
};

export default ConfirmationPopup;
