
import * as Yup from "yup";

const editActiveUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name should be at least 3 characters")
    .max(50, "First name should not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .required("First name is required"),

    lastName: Yup.string()
    .max(50, "Last name should not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]*$/, "Last name can only contain letters, numbers, and spaces"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),

  department: Yup.string()
    .max(100, "Department name should not exceed 100 characters"),

  designation: Yup.string()
    .max(100, "Designation should not exceed 100 characters"),

  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Phone must be a valid 10-digit Indian number"),

  employeeId: Yup.string()
    .max(20, "Employee ID should not exceed 20 characters"),

  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future"),
});

export default editActiveUserValidationSchema;
