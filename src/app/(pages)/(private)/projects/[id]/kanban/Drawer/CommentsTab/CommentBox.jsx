import MyTextField from "@/components/MyTextfield/MyTextfield";
import { getTimeAgo } from "@/utils";
import { Box, Button, IconButton, Typography } from "@mui/material";

const CommentBox = ({
  comment,
  editingCommentId,
  theme,
  loadingEditComment,
  setEditingCommentId,
  setEditedText,
  handleEditComment,
  handleDeletePopupOpen,
  editedText,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        gap={2}
        className="comments__commentBox"
        position={"relative"}
        sx={{
          "&:hover .commentBox__actions": {
            opacity: 1,
          },
        }}
      >
        <Box
          className="commentBox__left"
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={comment?.user?.avatar || "/dummyUser.svg"}
            alt="avatar"
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              color: "transparent",
              textIndent: "10000px",
            }}
          />
        </Box>
        <Box
          className="commentBox__right"
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={14}
              color={theme?.palette?.primary?.main}
            >{`${comment?.user?.firstName || ""} ${
              comment?.user?.lastName || ""
            }`}</Typography>
            <Typography fontSize={12} color="#919EAB">
              {getTimeAgo(comment?.updatedAt || 0)}
            </Typography>
          </Box>
          <Box>
            {editingCommentId === comment?.id ? (
              <MyTextField
                fullWidth
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                multiline
                rows={2}
                border="1px solid rgba(145,158,171,0.16)"
                loading={loadingEditComment}
                label=""
              />
            ) : (
              <Typography fontSize={14} color={theme?.palette?.primary?.main}>
                {comment?.text || ""}
              </Typography>
            )}
            {editingCommentId === comment?.id ? (
              <Box mt={1} display="flex" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEditComment(comment?.id)}
                  disabled={loadingEditComment}
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditedText("");
                  }}
                >
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          className="commentBox__actions"
          pt={"4px"}
          sx={{
            opacity: 0,
            position: "absolute",
            display: "flex",
            top: "100%",
            right: "0px",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <IconButton
            onClick={() => {
              setEditingCommentId(comment?.id);
              setEditedText(comment?.text);
            }}
            sx={{
              "&:hover": {
                background: "99,115,129,0.08",
              },
              flex: "0 0 auto",
              borderRadius: "50%",
              padding: "5px",
            }}
          >
            <img
              src="/editIcon.svg"
              alt="reply"
              style={{ width: "16px", height: "16px", flexShrink: 0 }}
            />
          </IconButton>
          <IconButton
            onClick={() => handleDeletePopupOpen(comment)}
            sx={{
              "&:hover": {
                background: "99,115,129,0.08",
              },
              flex: "0 0 auto",
              borderRadius: "50%",
              padding: "5px",
            }}
          >
            <img
              src="/deleteIcon.svg"
              alt="delete"
              style={{ width: "16px", height: "16px", flexShrink: 0 }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
export default CommentBox;
