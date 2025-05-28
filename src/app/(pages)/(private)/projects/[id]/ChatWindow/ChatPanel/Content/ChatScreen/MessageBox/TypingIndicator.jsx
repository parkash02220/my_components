import { Box, Typography, keyframes } from "@mui/material";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  } 
  40% {
    transform: translateY(-6px);
  }
`;

const wave = keyframes`
  0% {
    opacity: 0.2;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(3px);
  }
  100% {
    opacity: 0.2;
    transform: translateX(0);
  }
`;

const TypingIndicator = ({ username = "Someone" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap:1,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: "0px 0px 8px 16px",
      }}
    >
      <Typography fontSize={14} color="#637381">
        {username} is typing
      </Typography>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#637381",
              animation: `${bounce} 0.6s ease-in-out infinite alternate, ${wave} 1.2s ease-in-out infinite`,
              animationDelay: `${dot * 0.2}s, ${dot * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TypingIndicator;
