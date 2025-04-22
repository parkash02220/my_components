import useEditTask from "@/hooks/projects/task/useEditTask";
import useUploadAttachments from "@/hooks/projects/task/useUploadAttachments";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import AssignDialog from "./AssignDialog";
import { Box, IconButton, Typography } from "@mui/material";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import MyTooltip from "@/components/MyTooltip/MyTooltip";

const OverviewTab = ({activeTask}) => {
    const { uploadImage, progressUploadAttachments, errorUploadAttachments, successUploadAttachments,loadingUploadAttachments } = useUploadAttachments();
    const {loadingEditTask,errorEditTask,updateTaskInBackend} = useEditTask();
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [showEditTextfield,setShowEditTextfield] = useState(false);
    const priorityList = [
        { label: "Low", value: "low", icon: "/lowPriorityIcon.svg" },
        { label: "Medium", value: "medium", icon: "/meduimPriorityIcon.svg" },
        { label: "High", value: "high", icon: "/highPriorityIcon.svg" },
      ];
    
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          title: activeTask?.title || "",
          description: activeTask?.description || "",
          priority: activeTask?.priority || "medium",
          assigned_to: activeTask?.assigned_to || [],
        },
        onSubmit: async (values) => {
         console.log("::formik in edit task",values);
          updateTaskInBackend(values,activeTask?.id);
        },
      });

      const [attachments,setAttachments] = useState(activeTask?.attachments || []);

      const handleAssignDialogOpen = () => {
        setAssignDialogOpen(true);
      };
    
      const handleAssignDialogClose = () => {
        setAssignDialogOpen(false);
      };

      useEffect(() => {
        return () => {
          attachments.forEach((file) => {
            if (file instanceof File) URL.revokeObjectURL(file.preview);
          });
        };
      }, [attachments]);
    return <>
         <AssignDialog
        open={assignDialogOpen}
        handleClose={handleAssignDialogClose}
        assignedUsers = {formik.values.assigned_to}
      />
     <Box padding={"24px 20px"}>
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Box>
              {
                showEditTextfield ? (
                  <MyTextField 
                  name="title"
                  label=""
                  fontWeight={600}
                   value={formik?.values?.title}
                   onChange={formik.handleChange}
                   onBlur={()=> {formik.handleSubmit(); setShowEditTextfield(false)}}
                  />
                ) : (
                  <Typography
                fontSize={18}
                fontWeight={600}
                padding={"4px 0px 5px"}
                color="#1C252E"
                onClick={()=> setShowEditTextfield(true)}
              >
                {formik?.values?.title}
              </Typography>
                )
              }
            </Box>

            <SectionRow label="Reporter" className="editTask__reporterBox">
              <AvatarBox src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp" />
            </SectionRow>

            <SectionRow label="Assignee" className="editTask__assigneeBox">
              {/* {[
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-2.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-3.webp",
                "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-4.webp",
              ].map((a, i) => (
                <AvatarBox key={i} src={`${a}`} />
              ))} */}
              {activeTask?.assigned_to?.map((a, i) => (
                <AvatarBox
                  key={i}
                  src={`https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-2.webp`}
                />
              ))}
              <MyTooltip title="Add assignee" placement="bottom">
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                  padding={"8px"}
                  border={"1px dashed rgba(145 158 171 / 0.2)"}
                  sx={{
                    cursor: "pointer",
                    background: "rgba(145,158,171,0.08)",
                    "&:hover": {
                      background: "rgba(99,115,129,0.08)",
                    },
                  }}
                  onClick={handleAssignDialogOpen}
                >
                  <img
                    src="/addAssignIcon.svg"
                    alt="add assignee"
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </MyTooltip>
            </SectionRow>
            <SectionRow label="Labels" className="editTask__labelsBox">
              {["Technology", "Health and Wellness", "Finance"].map(
                (label, i) => (
                  <LabelTag key={i} text={label} />
                )
              )}
            </SectionRow>
            <SectionRow label="Due date" className="editTask__dueDateBox">
              <Typography fontWeight={700} color="#1C252E" fontSize="13px">
                23-24 Apr 2025
              </Typography>
            </SectionRow>
            <SectionRow label="Priority" className="editTask__priorityBox">
              {priorityList?.map((priority, index) => (
                <Box
                  key={index}
                  onClick={() => {formik.setFieldValue("priority", priority.value); formik.submitForm();}
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <PriorityOption
                    label={priority?.label}
                    iconSrc={priority?.icon}
                    isSelected={formik.values.priority === priority?.value}
                  />
                </Box>
              ))}
            </SectionRow>
            <SectionRow
              label="Description"
              className="editTask__descriptionBox"
                labelStyle={{alignSelf:"flex-start"}}
            >
              <Box width="100%">
                <MyTextField
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleSubmit}
                  label=""
                  multiline
                  rows={4}
                  boxShadow="inset 0 0 0 1px rgba(145,158,171,0.24)"
                  borderColor="transparent"
                  fullWidth
                  hoverBorderColor="#1C252E"
                  acitveBorder={"2px solid #000000"}
                />
              </Box>
            </SectionRow>
            <SectionRow
              label="Attachments"
              className="editTask__attachmentsBox"
              labelStyle={{alignSelf:"flex-start"}}
            >
              <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                {attachments.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "#eee",
                    }}
                  >
                    <img
                      src={
                        file instanceof File ? URL.createObjectURL(file) : file
                      }
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                     <IconButton
                    onClick={() => {
                      const newList = attachments.filter(
                        (_, i) => i !== index
                      );
                      setAttachments(newList);
                    }}
                    sx={{
                      position:'absolute',
                      top:'4px',
                      right:'4px',
                      backgroundColor:"rgba(20,26,33,0.48)",
                      borderRadius:"50%",
                      padding:"2.8px",
                      overflow:"hidden",
                    }}
                  >
                   <img src="/removeAttachmentIcon.svg" alt="remove attachment" style={{width:"100%",height:"100%"}} />
                  </IconButton>
                  </Box>
                ))}

                <Box
                  sx={{
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "rgba(145,158,171,0.08)",
                  }}
                >
                  <label htmlFor="upload-input">
                    <input
                      id="upload-input"
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setAttachments((attachments)=> [...attachments,...files]);
                           uploadImage(files,activeTask?.id);
                      }}
                    />
                    <img
                      src="/attachmentsIcon.svg"
                      alt="attachments"
                      style={{
                        width: "28px",
                        height: "28px",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                </Box>
              </Box>
            </SectionRow>
          </Box>
        </Box>
    </>
}
export default OverviewTab;

const SectionRow = ({ label,labelStyle={}, children, className = "" }) => (
    <Box display="flex" alignItems="center" className={className}>
      <Typography
        fontWeight={600}
        fontSize="0.75rem"
        width="100px"
        flexShrink={0}
        color="#637381"
        sx={{...labelStyle}}
      >
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
  
  const AvatarBox = ({ src, alt = "user" }) => (
    <Box
      width={40}
      height={40}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      overflow="hidden"
      fontSize="1.25rem"
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          color: "transparent",
        }}
      />
    </Box>
  );
  
  const LabelTag = ({ text }) => (
    <Box
      sx={{
        height: "24px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,184,217,0.16)",
        padding: "0px",
        borderRadius: "8px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          paddingInline: "8px",
          fontSize: "13px",
          color: "#006C9C",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
  
  const PriorityOption = ({ label, iconSrc, isSelected = false }) => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "4px 10px 4px 6px",
        borderRadius: "8px",
        boxShadow: "inset 0 0 0 1px rgba(145,158,171,0.24)",
        border: isSelected ? "2px solid black" : "none",
      }}
    >
      <Box sx={{ width: "20px", height: "20px", marginRight: "4px" }}>
        <img
          src={iconSrc}
          alt={label}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "capitalize",
          color: "#1C252E",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
  