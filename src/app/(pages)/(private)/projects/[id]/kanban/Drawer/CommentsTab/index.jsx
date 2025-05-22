import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { useAppContext } from "@/context/App/AppContext";
import useAddTaskComment from "@/hooks/projects/task/comment/useAddTaskComment";
import useGetAllTaskComments from "@/hooks/projects/task/comment/useGetAllTaskComments";
import { getTimeAgo } from "@/utils";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";

const CommentsTab = ({ activeTask }) => {
  const {
    loadingAllTaskComments,
    errorAllTaskComments,
    getAllTaskComments,
    allComments,
    setAllComments,
  } = useGetAllTaskComments(activeTask?.id);
  const { loadingAddCommnet, errorAddComment, addCommentToTask } =
    useAddTaskComment();
  const { activeUser } = useAppContext()?.state;
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      handleAddComment(values);
    },
  });
  const handleAddComment = async (values) => {
    const updatedComments = await addCommentToTask(
      activeTask?.id,
      values?.comment,
      activeTask?.section_id
    );
    setAllComments((pre) => (updatedComments ? updatedComments : pre));
    formik.setFieldValue("comment", "");
  };
  return (
    <>
      <Box
        sx={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          position: "relative",
          height: "calc(100vh - 145px)",
        }}
      >
        {!loadingAllTaskComments ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: "calc(100% - 130px)",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {allComments?.map((comment) => {
              return (
                <Box
                  display={"flex"}
                  gap={2}
                  className="comments__commentBox"
                  key={comment?.id}
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
                      <Typography
                        fontSize={14}
                        color={theme?.palette?.primary?.main}
                      >
                        {comment?.text || ""}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            sx={{
              height: "calc(100% - 130px)",
            }}
          >
            <img src="/iosLoader.gif" width={"40px"} height={"40px"} />
          </Box>
        )}

        <Box
          className="comments__InputContainer"
          sx={{
            padding: "24px 20px 20px 24px",
            display: "flex",
            gap: 2,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Box
            className="inputContainer__left"
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={activeUser?.avatar || "/dummyUser.svg"}
              alt="avatar"
               referrerPolicy="no-referrer"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                textIndent: "10000px",
                color: "transparent",
              }}
            />
          </Box>
          <Box
            className="inputContainer__right"
            sx={{
              p: 1,
              borderRadius: "8px",
              border: "1px solid rgba(145,158,171,0.16)",
              backgroundColor: "transparent",
              color: theme?.palette?.primary?.main,
              width: "calc(100% - 40px)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <MyTextField
                name="comment"
                value={formik?.values?.comment}
                onChange={formik?.handleChange}
                label=""
                fullWidth
                placeholder="Type a message"
                padding={"4px 8px 5px 8px"}
                multiline={true}
                rows={2}
                border={"none"}
                disabled={loadingAddCommnet}
              />
            </Box>
            <Box display={"flex"} alignItems={"space-between"}>
              <Box display={"flex"} flexGrow={1}>
                <IconButton
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    padding: "8px",
                    flex: "0 0 auto",
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px", flexShrink: 0 }}
                    src="/uploadImageIcon.svg"
                    alt="upload image"
                  />
                </IconButton>
                <IconButton
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    padding: "8px",
                    flex: "0 0 auto",
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px", flexShrink: 0 }}
                    src="/uploadAttachmentIcon.svg"
                    alt="upload image"
                  />
                </IconButton>
              </Box>
              <Box>
                <MyButton
                  variant="contained"
                  fontWeight={700}
                  padding={"6px 12px"}
                  color={theme?.palette?.primary?.main}
                  minWidth="64px"
                  width={"fit-content"}
                  borderRadius="8px"
                  onClick={formik.handleSubmit}
                  loading={loadingAddCommnet}
                  loadingText={"Adding..."}
                >
                  Comment
                </MyButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CommentsTab;
