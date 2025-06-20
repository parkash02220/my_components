export const formikInitialValues = {
  firstName: "",
  lastName: "",
  role: "",
  gender: "",
  department: "",
  designation: "",
  phone: "",
  employeeId: "",
  dateOfBirth: "",
};

export const getFormikCompatibleValues = (user) => {
  const profile = user?.userProfile || {};
  const rawDob = profile?.dateOfBirth;

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || "",
    gender: user?.gender || "",
    department: profile.department?.id || "",
    designation: profile.designation?.id || "",
    phone: profile.phone || "",
    employeeId: profile.employeeId || "",
    dateOfBirth: formatDate(rawDob),
  };
};
