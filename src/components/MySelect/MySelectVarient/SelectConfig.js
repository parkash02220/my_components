import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { getRenderValue } from "./GetRenderValue";
import { getRenderOptions } from "./GetRenderOption";
import { getFullName } from "@/utils";
import useGetAllDepartments from "@/hooks/organization/useGetAllDepartments";
import useGetDesignationsByDepartment from "@/hooks/organization/useGetDesignationsByDepartment";
import useGetAllDesignations from "@/hooks/organization/useGetAllDesignations";
const baseStyleProps = {
  shrink: true,
  borderColor: "#ccc",
  hoverBorderColor: "#1C252E",
  focusedBorder: "2px solid #1C252E",
  labelColor: "#637381",
  labelFontWeight: 700,
  fullWidth: true,
  minWidth: "100px",
  selectFontSize: { xs: "12px", sm: "13px", lg: "14px" },
  labelFontSize: { xs: "12px", sm: "13px", lg: "14px" },
};

export const selectConfig = {
  multi_all_designations: {
    useHook: useGetAllDesignations,
    multiple: true,
    selectors: (result) => ({
      options: result?.allDesignations?.map((designation) => ({
        id: designation?.id,
        label: designation?.name,
        value: designation?.id,
      })),
      loading: result?.loading,
      hasFetchedOnce: result?.hasFetchedOnce,
    }),
    renderValue: getRenderValue("label", true),
    renderOption: (isMultiple, selected) =>
      getRenderOptions("label", isMultiple, selected),
    styleProps: {
      ...baseStyleProps,
      shrink: undefined,
      labelFontWeight: 500,
      color: "#1C252E",
    },
  },
  all_departments: {
    useHook: useGetAllDepartments,
    multiple: false,
    selectors: (result) => ({
      options: result?.allDepartments?.map((department) => ({
        id: department?.id,
        label: department?.name,
        value: department?.id,
      })),
      loading: result?.loading,
      hasFetchedOnce: result?.hasFetchedOnce,
    }),
    renderValue: getRenderValue("label"),
    renderOption: (isMultiple, selected) =>
      getRenderOptions("label", isMultiple, selected),
    styleProps: {
      ...baseStyleProps,
    },
  },
  designation_by_department: {
    useHook: (departmentId) => useGetDesignationsByDepartment(departmentId),
    multiple: false,
    selectors: (result) => ({
      options: result?.designations?.map((designation) => ({
        id: designation?.id,
        label: designation?.name,
        value: designation?.id,
      })),
      loading: result?.loading,
      hasFetchedOnce: result?.hasFetchedOnce,
    }),
    renderValue: getRenderValue("label"),
    renderOption: (isMultiple, selected) =>
      getRenderOptions("label", isMultiple, selected),
    styleProps: {
      ...baseStyleProps,
    },
  },
};
