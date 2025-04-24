import { useCallback } from "react";
import toast from "react-hot-toast";
import { Box, Typography } from "@mui/material";

const toastStyles = {
  base: {
    padding: "4px 8px 4px 4px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px 0 rgba(145 158 171 / 0.16)",
    color: "#1C252E",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 300,
    zIndex: "99999",
    position: "relative",
  },
  success: {},
  error: {},
  loading: {},
};

const useToast = () => {
  const showToast = useCallback(
    ({ type = "success", message = "", duration = 3000 }) => {
      toast.custom(
        (t) => {
          const style = { ...toastStyles.base, ...toastStyles[type] };

          return (
            <Box sx={style}>
              <Box
                onClick={(t) => toast.dismiss(t.id)}
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  top: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  background: "transparent",
                  transform: "translate(-6px,6px)",
                  padding: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(145,158,171,0.16)",
                }}
              >
                <img
                  src="/closeToastIcon.svg"
                  alt="close"
                  style={{ width: "14px", height: "14px" }}
                />
              </Box>
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "inherit",
                  background: "rgba(34,197,94,0.08)",
                }}
              >
                {type === "success" ? (
                  <img
                    src="/toastSuccessIcon.svg"
                    alt="success"
                    style={{ width: "24px", height: "24px", flexShrink: 0 }}
                  />
                ) : (
                  <img
                    src="/errorToastIcon.png"
                    alt="error"
                    style={{ width: "24px", height: "24px", flexShrink: 0 }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  pr: 4,
                  flex: "1 1 auto",
                  transition: "opacity .4s",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 500, color: "#1C252E" }}
                >
                  {message}
                </Typography>
              </Box>
            </Box>
          );
        },
        { duration }
      );
    },
    []
  );

  return { showToast };
};

export default useToast;
