import { ExpandLess } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const BackButton = ({
  fontSize,
  path,
  iconOnly = false,
  text = "Back",
}) => {
  const router = useRouter();
  const handleBackNavigation = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };
  return (
    <>
      <Box
        onClick={handleBackNavigation}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          cursor: "pointer",
        }}
      >
        <ExpandLess
          sx={{
            transform: "rotate(270deg)",
            color: "#1C252E",
          }}
        />{" "}
        {!iconOnly && (
          <Typography
            fontWeight={700}
            color="#1C252E"
            fontSize={fontSize || 14}
          >
            {text}
          </Typography>
        )}
      </Box>
    </>
  );
};
export default BackButton;
