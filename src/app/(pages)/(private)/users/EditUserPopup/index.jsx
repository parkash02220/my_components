import UserDetailsForm from "@/app/(pages)/(public)/signup/UserDetailsForm";
import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { Box, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import editUserValidationSchema from "@/validations/editUserValidationSchema";
import { formikInitialValues, getFormikCompatibleValues } from "./helper";

const EditUserPopup = ({
  title,
  handleClose,
  open,
  message,
  cancelText,
  submitText,
  cancelAction,
  submitAction,
  type,
  loading,
  loadingText,
  user,
  setData,
}) => {
  const { isXs } = useBreakpointFlags();
  const theme = useTheme();
  const { loadingUpdateUser, errorUpdateUser, updateUser } = useUpdateUser();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValues,
    validationSchema: editUserValidationSchema,
    onSubmit: async (values) => {
      const updatedUser = await updateUser(values, user?.id);
      setData((prev) =>
        prev?.map((data) => {
          if (data?.id === user?.id) {
            return updatedUser;
          }
          return data;
        })
      );
      handleClose();
    },
  });
  useEffect(() => {
    if (open && user) {
      formik.setValues(getFormikCompatibleValues(user));
    }
  }, [user, open]);
  return (
    <>
      <MyDialog
        open={open}
        handleClose={handleClose}
        title={title}
        fontSize="18px"
        titlepadding="24px 24px 16px"
        contentpadding="0px 24px !important"
        actionpadding="24px !important"
        width={isXs ? "100%" : "auto"}
        content={
          <Box pt={2} pb={2}>
            {<UserDetailsForm formik={formik} type={"update_user"} />}
          </Box>
        }
        actions={
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={1.5}
            width="100%"
            p={0}
          >
            <MyButton
              onClick={submitAction ? submitAction : formik.handleSubmit}
              variant="contained"
              loadingText={loadingText || "Deleting"}
              padding={"6px 12px"}
              minWidth="64px"
              fontWeight={700}
              fontSize={14}
              color="#FFFFFF"
              backgroundColor="#1C252E"
              borderRadius="8px"
              loading={loading}
            >
              {submitText || "Update"}
            </MyButton>
            <MyButton
              onClick={cancelAction ? cancelAction : handleClose}
              padding={"6px 12px"}
              minWidth="64px"
              fontWeight={700}
              color={theme?.palette?.primary?.main}
              borderRadius="8px"
              variant="outlined"
              fontSize={14}
              hoverBgColor="whitesmoke"
            >
              {cancelText || "Cancel"}
            </MyButton>
          </Box>
        }
      />
    </>
  );
};
export default EditUserPopup;
