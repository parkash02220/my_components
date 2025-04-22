import { Box, Typography, useTheme } from "@mui/material";
import MyDialog from "../MyDialog/MyDialog";
import MyButton from "../MyButton/MyButton";

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
}) => {
  const theme = useTheme();
  if (type === "delete") {
    return (
      <>
        <MyDialog
          open={open}
          handleClose={handleClose}
          title={title}
          fontsize="18px"
          titlepadding="24px 24px 16px"
          contentpadding="0px 24px !important"
          actionpadding="24px !important"
          content={
            <Box>
              <Typography fontSize={14} color={theme?.palette?.primary?.main}>
                Are you sure want to delete <span style={{fontWeight:700}}>{message}</span>?
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
                loadingText={"checking..."}
                padding={"6px 12px"}
                minWidth="64p"
                fontWeight={700}
                fontSize={14}
                color="#FFFFFF"
                borderRadius="8px"
                backgroundColor="#FF5630"
                hoverBgColor="red"
              >
                {submitText || "Delete"}
              </MyButton>
              <MyButton
                onClick={cancelAction ? cancelAction : handleClose}
                padding={"6px 12px"}
                minWidth="64p"
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
