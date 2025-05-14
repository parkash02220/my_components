import UserDetailsForm from "@/app/(pages)/(public)/signup/UserDetailsForm";
import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useUpdateUser from "@/hooks/projects/user/useUpdateUser";
import { Box, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';
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
    const {isXs} = useBreakpointFlags();
    const theme = useTheme();
    const {loadingUpdateUser,errorUpdateUser,updateUser} = useUpdateUser();
    console.log("::user",user)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            role:'',
            gender:'',
            avatar:'',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
              .min(3, "First name should be bigger than 2 chars")
              .required("This field is required"),
            lastName: Yup.string(),
            email: Yup.string()
              .email("invalid email address")
              .required("This field is required"),
            gender: Yup.string().required("This field is required"),
          }),
       onSubmit: async(values) => {
          console.log("::values",values);
          setData((prev) =>
            prev?.map((data) => {
              if (data?.id === user?.id) {
                return {
                  ...data,
                  ...values,
                  nameWithAvatar: {
                    name: `${values.firstName} ${values.lastName}`,
                    avatar: values.avatar || '',
                  },
                };
              }
              return data;
            })
          );
          await updateUser(values,user?.id);
          handleClose();
       }
    })
    useEffect(()=> {
        if(open && user){
            formik.setValues(user);
        }
    },[user,open]);
    console.log("::formik",formik)
    return <>
     <MyDialog
          open={open}
          handleClose={handleClose}
          title={title}
          fontSize="18px"
          titlepadding="24px 24px 16px"
          contentpadding="0px 24px !important"
          actionpadding="24px !important"
          width={isXs ? '100%':'auto'} 
          content={
            <Box pt={2} pb={2}>
                {<UserDetailsForm formik={formik} type={'create_user'}/>}
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
}
export default EditUserPopup;