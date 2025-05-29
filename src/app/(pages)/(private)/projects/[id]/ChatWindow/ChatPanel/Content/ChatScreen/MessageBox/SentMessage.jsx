import { useMemo } from "react";
import { getTimeAgo } from "@/utils";
import { Box, IconButton, Typography } from "@mui/material";

const SentMessage = ({ msg }) => {
  const timeAgo = useMemo(() => getTimeAgo(msg?.createdAt), [msg?.createdAt]);

  const actionIcons = [
    { src: "/replyMsgIcon.svg", alt: "reply" },
    { src: "/emojiIcon.svg", alt: "react" },
    { src: "/deleteIcon.svg", alt: "delete" },
  ];

  return (
    <Box mb={5} display="flex" justifyContent="flex-end">
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography color="#919EAB" fontSize={12} mb={1} noWrap>
          {timeAgo}
        </Typography>

        <Box display="flex" alignItems="center" position="relative">
          <Box
            px={1.5}
            py={1.5}
            minWidth={48}
            maxWidth={320}
            fontSize={14}
            borderRadius={1}
            bgcolor="#C8FAD6"
            color="#1C252E"
            display="flex"
            flexDirection="column"
          >
            {msg?.text || ""}
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "100%",
              right: 0,
              pt: "4px",
              opacity: 0,
              display: "flex",
              transition: "opacity 200ms ease",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            {actionIcons.map((icon, index) => (
              <IconButton
                key={index}
                sx={{
                  padding: "5px",
                  borderRadius: "50%",
                  flex: "0 0 auto",
                  "&:hover": {
                    backgroundColor: "rgba(99, 115, 129, 0.08)",
                  },
                }}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  style={{ width: 16, height: 16, flexShrink: 0 }}
                />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SentMessage;
