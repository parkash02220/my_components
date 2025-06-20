export const getAllIdsAndByIdsFromArray = (allDepartments) => {
  let allIds = [];
  let byIds = {};
  allDepartments?.forEach((department) => {
    allIds.push(department?.id);
    byIds[department?.id] = department;
  });

  return { allIds, byIds };
};
