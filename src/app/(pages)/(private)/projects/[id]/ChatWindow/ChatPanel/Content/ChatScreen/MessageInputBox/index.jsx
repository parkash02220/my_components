import MyTextField from "@/components/MyTextfield/MyTextfield";
import { Box, IconButton } from "@mui/material";
import TextMessage from "./TextMessage";

const MessageInputBox = ({
  chatType,
  selectedUsers,
  selectedDirectoryItem,
  handleChatStart,
  setSelectedDirectoryItem,
}) => {
  const isGroupChat = chatType === "group__chat";
  const isDisabled = !selectedDirectoryItem && selectedUsers?.length === 0;
  const inputIcons = [
    {
      name: "add image",
      src: "/uploadImageIcon.svg",
      alt: "add image",
      onClick: () => console.log("::add image button clicked"),
    },
    {
      name: "add attachment",
      src: "/uploadAttachmentIcon.svg",
      alt: "add attachment",
      onClick: () => console.log("::add attachment button clicked"),
    },
    {
      name: "voice input",
      src: "/microphoneIcon.svg",
      alt: "voice input",
      onClick: () => console.log("::microphone button clicked"),
    },
  ];
  return (
    <>
      <Box
        height={56}
        flexShrink={0}
        borderTop={"1px solid rgba(145,158,171,0.2)"}
        paddingInline={1}
        display={"inline-flex"}
        alignItems={"center"}
        sx={{ cursor: "text" }}
        position={"relative"}
      >
        <IconButton
          disabled={isDisabled}
          sx={{
            borderRadius: "50%",
            flex: "0 0 auto",
            "&:hover": {
              background: "rgba(99 ,115 ,129 , 0.08)",
            },
          }}
        >
          {" "}
          <img
            src="/emojiIcon.svg"
            alt="emoji"
            style={{ width: "20px", height: "20px", flexShrink: 0 }}
          />
        </IconButton>
        <Box flex={"1 1 auto"}>
          <TextMessage
            isDisabled={isDisabled}
            isGroupChat={isGroupChat}
            selectedUsers={selectedUsers}
            handleChatStart={handleChatStart}
            selectedDirectoryItem={selectedDirectoryItem}
            setSelectedDirectoryItem={setSelectedDirectoryItem}
          />
        </Box>
        <Box display={"flex"} alignItems={"space-between"}>
          <Box display={"flex"} flexGrow={1}>
            {inputIcons?.map((icon, i) => {
              return (
                <IconButton
                  disabled={isDisabled}
                  key={i}
                  onClick={icon?.onClick}
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    padding: "8px",
                    flex: "0 0 auto",
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px", flexShrink: 0 }}
                    src={icon?.src}
                    alt={icon?.alt}
                  />
                </IconButton>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default MessageInputBox;
