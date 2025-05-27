import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { Box, IconButton } from "@mui/material";

const CommentInput = ({avatar,formik,loadingAddCommnet,theme}) => {
    return <>
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
              src={avatar || "/dummyUser.svg"}
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
    </>
}
export default CommentInput;