import useEditTask from "@/hooks/projects/task/useEditTask";
import useUploadAttachments from "@/hooks/projects/task/useUploadAttachments";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import AssignDialog from "./AssignDialog.jsx";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { useAppContext } from "@/context/AppContext";
import useDeleteAttachments from "@/hooks/projects/task/useDeleteAttachments";
import DueDateDialog from "./DueDateDialog.jsx";
import AttachmentViewer from "./AttachmentViewer.jsx";
import { formatDueDateRange, getFullName } from "@/utils/index.js";
const OverviewTab = () => {
  const { state } = useAppContext();
  const { activeTask } = state || {};
  const {
    uploadImage,
    progressUploadAttachments,
    errorUploadAttachments,
    successUploadAttachments,
    loadingUploadAttachments,
  } = useUploadAttachments();
  const { loadingDeleteAttachment, errorDeleteAttachment, deleteAttachment } =
    useDeleteAttachments();
  const { loadingEditTask, errorEditTask, updateTaskInBackend } = useEditTask();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [dueDateDialogOpen, setDueDateDialogOpen] = useState(false);
  const [attachmentViewerOpen, setAttachmentViewerOpen] = useState({
    open: false,
    selectedImage: 0,
  });
  const [showEditTextfield, setShowEditTextfield] = useState(false);
  const inputRef = useRef(null);
  const [deleteImagePath, setDeleteImagePath] = useState([]);
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
      due_start_date: activeTask?.due_start_date?.slice(0, 10) || "",
      due_end_date: activeTask?.due_end_date?.slice(0, 10) || "",
    },
    onSubmit: async (values) => {
      updateTaskInBackend(values, activeTask?.id);
    },
  });

  const [attachments, setAttachments] = useState(activeTask?.images || []);

  const handleAssignDialogOpen = () => {
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = () => {
    setAssignDialogOpen(false);
  };

  const handleDueDateDialogOpen = () => {
    setDueDateDialogOpen(true);
  };

  const handleDueDateDialogClose = () => {
    setDueDateDialogOpen(false);
  };

  const handleAttachmentViewerOpen = (index) => {
    setAttachmentViewerOpen({ open: true, selectedImage: index });
  };

  const handleAttachmentViewerClose = () => {
    setAttachmentViewerOpen({ open: false, selectedImage: 0 });
  };

  useEffect(() => {
    const backendImages = Array.isArray(activeTask?.images)
      ? activeTask.images
      : [];

    setAttachments(backendImages);
  }, [activeTask?.images]);

  useEffect(() => {
    return () => {
      attachments.forEach((file) => {
        if (file instanceof File && file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [attachments]);

  const handleAttachmentDelete = async (index) => {
    const image = attachments[index];
    const imagePath = typeof image === "string" ? image : image?.name;
    setDeleteImagePath((prev) => [...prev, imagePath]);
    await deleteAttachment(image, activeTask?.id, activeTask?.section_id);
    setDeleteImagePath((pre) => pre?.filter((path) => path !== imagePath));
  };

  useEffect(() => {
    if (showEditTextfield && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEditTextfield]);

  const updateDueDate = async (startDate, endDate) => {
    if (!startDate || !endDate) return;
    await updateTaskInBackend(
      { due_start_date: startDate, due_end_date: endDate },
      activeTask?.id
    );
  };
  console.log("::active task in overview tab ", activeTask);
  return (
    <>
      <AssignDialog
        open={assignDialogOpen}
        handleClose={handleAssignDialogClose}
        assignedUsers={formik.values.assigned_to}
        taskId={activeTask?.id}
      />
      <DueDateDialog
        handleClose={handleDueDateDialogClose}
        open={dueDateDialogOpen}
        updateDueDate={updateDueDate}
        taskStartDate={formik?.values?.due_start_date}
        taskEndDate={formik?.values?.due_end_date}
        loadingEditTask={loadingEditTask}
      />
      <AttachmentViewer
        open={attachmentViewerOpen?.open}
        selectedImage={attachmentViewerOpen?.selectedImage}
        attachments={attachments}
        handleClose={handleAttachmentViewerClose}
      />
      <Box padding={"24px 20px"}>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Box>
            {showEditTextfield ? (
              <MyTextField
                inputRef={inputRef}
                name="title"
                label=""
                fontWeight={600}
                value={formik?.values?.title}
                onChange={formik.handleChange}
                onBlur={() => {
                  formik.handleSubmit();
                  setShowEditTextfield(false);
                }}
              />
            ) : (
              <Typography
                fontSize={18}
                fontWeight={600}
                padding={"4px 0px 5px"}
                color="#1C252E"
                onClick={() => setShowEditTextfield(true)}
              >
                {formik?.values?.title}
              </Typography>
            )}
          </Box>

          <SectionRow label="Reporter" className="editTask__reporterBox">
            <AvatarBox
              src={activeTask?.reporter?.avatar || "/dummyUser.svg"}
              user={activeTask?.reporter}
              withToolTip
            />
          </SectionRow>

          <SectionRow label="Assignee" className="editTask__assigneeBox">
            {
              activeTask?.assigned_to?.length > 0 ? (
                <Box display={"flex"} flexDirection={"row-reverse"} gap={1}>
                {activeTask?.assigned_to?.length > 6 && (
                  <MyTooltip
                    content={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          padding: 1,
                        }}
                      >
                        {activeTask?.assigned_to.map((user, index) => {
                          const name = getFullName(
                            user?.firstName,
                            user?.lastName
                          );
                          return (
                            <Box
                              key={index}
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              <img
                                src={user.avatar}
                                alt={name}
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                              <Typography fontSize={12} fontWeight={500} color="white">
                                {name}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    }
                  >
                    <Box
                      width={40}
                      height={40}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="50%"
                      overflow="hidden"
                      fontSize="14px"
                      sx={{
                        cursor: "pointer",
                        background: "#C8FAD6",
                      }}
                      color={"#007867"}
                      fontWeight={600}
                      position={"relative"}
                      boxSizing={"content-box"}
                      border={"2px solid #FFFFFF"}
                    >
                      +{activeTask?.assigned_to?.length - 5}
                    </Box>
                  </MyTooltip>
                )}
                <Box display={"flex"} gap={1}>
                  {activeTask?.assigned_to?.length > 0 &&
                    activeTask?.assigned_to
                      ?.slice(0, activeTask?.assigned_to?.length > 6 ? 5 : 6)
                      ?.map((item, index) => {
                        return (
                          <MyTooltip key={index} title={name} placement="bottom">
                            <AvatarBox
                              key={index}
                              src={item?.avatar}
                              user={item}
                              withToolTip
                            />
                          </MyTooltip>
                        );
                      })}
                </Box>
              </Box>
              ) : null
            }
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
            {["Technology", "Health and wellness", "Finance"].map(
              (label, i) => (
                <LabelTag key={i} text={label} />
              )
            )}
          </SectionRow>
          <SectionRow label="Due date" className="editTask__dueDateBox">
            <Typography
              fontWeight={700}
              color="#1C252E"
              fontSize="13px"
              onClick={handleDueDateDialogOpen}
              sx={{
                cursor: "pointer",
                "&:hover": { background: "rgba(145,158,171,0.08)" },
              }}
            >
              {formatDueDateRange(
                formik?.values?.due_start_date,
                formik?.values?.due_end_date
              )}
            </Typography>
          </SectionRow>
          <SectionRow label="Priority" className="editTask__priorityBox">
            {priorityList?.map((priority, index) => (
              <Box
                key={index}
                onClick={() => {
                  formik.setFieldValue("priority", priority.value);
                  formik.submitForm();
                }}
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
            labelStyle={{ alignSelf: "flex-start" }}
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
                fullWidth={true}
                hoverBorderColor="#1C252E"
                acitveBorder={"2px solid #000000"}
              />
            </Box>
          </SectionRow>
          <SectionRow
            label="Attachments"
            className="editTask__attachmentsBox"
            labelStyle={{ alignSelf: "flex-start" }}
          >
            <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
              {attachments.map((file, index) => {
                const imagePath = typeof file === "string" ? file : file.name;
                const isDeleting = deleteImagePath?.includes(imagePath);

                return (
                  <Box
                    key={imagePath}
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
                      onClick={() => handleAttachmentViewerOpen(index)}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                    <IconButton
                      onClick={() => handleAttachmentDelete(index)}
                      disabled={isDeleting}
                      sx={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        backgroundColor: "rgba(20,26,33,0.48)",
                        borderRadius: "50%",
                        padding: "2.8px",
                        overflow: "hidden",
                      }}
                    >
                      {isDeleting ? (
                        <CircularProgress
                          sx={{
                            width: "16px !important",
                            height: "16px !important",
                            color: "#637381",
                          }}
                        />
                      ) : (
                        <img
                          src="/removeAttachmentIcon.svg"
                          alt="remove attachment"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </IconButton>
                  </Box>
                );
              })}

              {loadingUploadAttachments && (
                <Box
                  sx={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "8px",
                    pb: "2px",
                    gap: "4px",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progressUploadAttachments}
                    sx={{
                      width: "28px !important",
                      height: "28px !important",
                      color: "#637381",
                    }}
                  />
                  <Typography variant="body2" fontSize={11}>
                    {progressUploadAttachments}%
                  </Typography>
                </Box>
              )}

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
                      // setAttachments((attachments) => [
                      //   ...attachments,
                      //   ...files,
                      // ]);
                      uploadImage(
                        files,
                        activeTask?.id,
                        activeTask?.section_id
                      );
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
  );
};
export default OverviewTab;

const SectionRow = ({ label, labelStyle = {}, children, className = "" }) => (
  <Box display="flex" alignItems="center" className={className}>
    <Typography
      fontWeight={600}
      fontSize="0.75rem"
      width="100px"
      flexShrink={0}
      color="#637381"
      sx={{ ...labelStyle }}
    >
      {label}
    </Typography>
    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" width={'100%'}>
      {children}
    </Box>
  </Box>
);

const AvatarBox = ({ src, alt = "user", user, withToolTip }) =>
  withToolTip ? (
    <MyTooltip
      title={getFullName(user?.firstName, user?.lastName)}
      placement="bottom"
    >
      <Box
        width={40}
        height={40}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        overflow="hidden"
        fontSize="1.25rem"
        sx={{
          cursor: "pointer",
        }}
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
    </MyTooltip>
  ) : (
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
