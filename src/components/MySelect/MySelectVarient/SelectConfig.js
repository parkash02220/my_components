import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { getRenderValue } from "./GetRenderValue";
import { getRenderOptions } from "./GetRenderOption";
import { getFullName } from "@/utils";
import useGetAllDepartments from "@/hooks/organization/useGetAllDepartments";
import useGetDesignationsByDepartment from "@/hooks/organization/useGetDesignationsByDepartment";
export const selectConfig = {
  all_users: {
    useHook: useGetAllUsers,
    multiple: true,
    selectors: (result) => ({
      options: result?.allUsers?.map((user) => ({
        ...user,
        label: getFullName(user?.firstName, user?.lastName),
        value: user?.id,
      })),
      loading: result?.loadingAllUsers,
      loadingMore: result?.loadingMoreAllUsers,
      loadMoreRef: result?.loadMoreRef,
      hasMore: result?.hasMore,
      resetStates: result?.resetStates,
      hasFetchedOnce: result?.hasFetchedOnce,
      refetchOptions: result?.resetStatesAndFetch,
    }),
    renderValue: getRenderValue("all_users"),
    renderOption: getRenderOptions("all_users"),
  },
  all_departments: {
    useHook: useGetAllDepartments,
    multiple: false,
    selectors: (result) => ({
      options: result?.allDepartments?.map((department) => ({
        id:department?.id,
        label: department?.name,
        value: department,
      })),
      loading: result?.loading,
      hasFetchedOnce: result?.hasFetchedOnce,
    }),
    renderValue: getRenderValue("all_departments"),
    renderOption: getRenderOptions("all_departments"),
    styleProps: {
      shrink: true,
      borderColor: "#ccc",
      hoverBorderColor: "#1C252E",
      focusedBorder: "2px solid #1C252E",
      labelColor: "#637381",
      labelFontWeight: 700,
      fullWidth: true,
      minWidth: "100px",
    },
  },
  designation_by_department: {
    useHook: (departmentId) => useGetDesignationsByDepartment(departmentId),
    multiple: false,
    selectors: (result) => ({
      options: result?.designations?.map((designation) => ({
        id:designation?.id,
        label: designation?.name,
        value: designation,
      })),
      loading: result?.loading,
      hasFetchedOnce: result?.hasFetchedOnce,
    }),
    renderValue: getRenderValue("designation_by_department"),
    renderOption: getRenderOptions("designation_by_department"),
    styleProps: {
      shrink: true,
      borderColor: "#ccc",
      hoverBorderColor: "#1C252E",
      focusedBorder: "2px solid #1C252E",
      labelColor: "#637381",
      labelFontWeight: 700,
      fullWidth: true,
      minWidth: "100px",
    },
  },
};
