import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { getFullName, getTimeAgo } from "@/utils";
import { Box, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";

const ReceivedMessage = ({ msg }) => {
  const { isXs } = useResponsiveBreakpoints();
  const { sender } = msg;

  const fullName = useMemo(
    () => getFullName(sender?.firstName, sender?.lastName),
    [sender?.firstName, sender?.lastName]
  );

  const timeAgo = useMemo(() => getTimeAgo(msg?.createdAt), [msg?.createdAt]);

  const actionIcons = [
    { src: "/replyMsgIcon.svg", alt: "reply" },
    { src: "/emojiIcon.svg", alt: "react" },
    { src: "/deleteIcon.svg", alt: "delete" },
  ];

  return (
    <Box mb={isXs ? 2 : 5} display="flex">
      <Box
        mr={2}
        width={32}
        height={32}
        borderRadius="50%"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexShrink={0}
      >
        <img
          src={sender?.avatar || "/dummyUser.svg"}
          alt={fullName}
          referrerPolicy="no-referrer"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            textIndent: "10000px",
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography
          color="#919EAB"
          fontSize={12}
          mb={1}
          noWrap
        >
          {fullName}, {timeAgo}
        </Typography>

        <Box display="flex" alignItems="center" position="relative">
        <Box
            px={1.5}
            py={1.5}
            minWidth={48}
            maxWidth={isXs ? "60%" : 320}
            borderRadius={1}
            bgcolor="#C8FAD6"
            display="flex"
            justifyContent={'flex-end'}
          >
            <Typography
              variant="primary"
              overflow={"hidden"}
              sx={{
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg?.text || ""}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              opacity: 0,
              display: "flex",
              pt: "4px",
              transition: "opacity 200ms ease",
              '&:hover': {
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

export default ReceivedMessage;
