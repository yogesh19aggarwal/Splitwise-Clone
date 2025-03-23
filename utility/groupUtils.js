export const isGroupInactive = group => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return new Date(group.updated_at) < oneMonthAgo;
};

export const getFilteredGroups = (groups) => {

  const activeGroups = groups.filter(group => !isGroupInactive(group));
  
  const inactiveGroups = groups.filter(group => isGroupInactive(group));
  
  return {
    activeGroups,
    inactiveGroups,
    hasInactiveGroups: inactiveGroups.length > 0
  };
};
