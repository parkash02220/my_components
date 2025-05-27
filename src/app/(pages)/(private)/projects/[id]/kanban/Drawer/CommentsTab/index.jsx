import ConfirmationPopup from "@/components/ConfirmationPopup";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { useAppContext } from "@/context/App/AppContext";
import useAddTaskComment from "@/hooks/projects/task/comment/useAddTaskComment";
import useDeleteComment from "@/hooks/projects/task/comment/useDeleteComment";
import useEditTaskComment from "@/hooks/projects/task/comment/useEditTaskComment";
import useGetAllTaskComments from "@/hooks/projects/task/comment/useGetAllTaskComments";
import { getTimeAgo } from "@/utils";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CommentInput from "./CommentInput";
import CommentBox from "./CommentBox";

const CommentsTab = ({ activeTask }) => {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const {
    loading: loadingDeleteComment,
    error: errorDeleteComment,
    deleteTaskComment,
  } = useDeleteComment();
  const {
    loading: loadingEditComment,
    error: errorEditComment,
    editTaskComment,
  } = useEditTaskComment();
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
  const handleDeletePopupOpen = (commnet) => {
    setSelectedComment(commnet);
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  const handleCommentDeleteButton = async () => {
    await deleteTaskComment(selectedComment?.id);
    handleDeletePopupClose();
  };
  const handleEditComment = async (commentId) => {
    const updated = await editTaskComment(commentId, editedText);
    if (updated) {
      setAllComments((prev) => updated);
      setEditingCommentId(null);
      setEditedText("");
    }
  };
  return (
    <>
      {deletePopupOpen && (
        <ConfirmationPopup
          title={"Delete Comment"}
          handleClose={handleDeletePopupClose}
          open={deletePopupOpen}
          message={"this comment"}
          type={"delete"}
          submitAction={handleCommentDeleteButton}
          loading={loadingDeleteComment}
        />
      )}
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
              return (<React.Fragment   key={comment?.id}>
                <CommentBox
                  comment={comment}
                  editingCommentId={editingCommentId}
                  theme={theme}
                  loadingEditComment={loadingEditComment}
                  setEditingCommentId={setEditingCommentId}
                  setEditedText={setEditedText}
                  handleEditComment={handleEditComment}
                  handleDeletePopupOpen={handleDeletePopupOpen}
                  editedText={editedText}
                />
                </React.Fragment>
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

        <CommentInput
          loadingAddCommnet={loadingAddCommnet}
          avatar={activeUser?.avatar}
          formik={formik}
          theme={theme}
        />
      </Box>
    </>
  );
};
export default CommentsTab;
