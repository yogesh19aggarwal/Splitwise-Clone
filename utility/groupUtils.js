import { calculateTotalBalance } from './calculateBalances';


export const isGroupInactive = group => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return new Date(group.updated_at) < oneMonthAgo;
};

// Function to check if a group is settled (has zero balance)
export const isGroupSettled = group => {
  const balance = calculateTotalBalance(group);
  return balance === null || Math.abs(balance) < 0.01; // Consider balances < 0.01 as settled
};

export const getFilteredGroups = (groups, showInactiveGroups = false, filterType = 'all') => {
  if (!groups) return { activeGroups: [], inactiveGroups: [], hasInactiveGroups: false };
  
  // First separate active and inactive groups based on time
  const activeByTime = groups.filter(group => !isGroupInactive(group));
  
  // Among active groups by time, separate by balance status for filtering
  let filteredActiveGroups = [...activeByTime];
  
  if (filterType === 'outstanding') {
    // Groups with non-zero balances
    filteredActiveGroups = activeByTime.filter(group => {
      const totalBalance = calculateTotalBalance(group);
      return totalBalance !== null && Math.abs(totalBalance) > 0;
    });
  } else if (filterType === 'owe') {
    // Groups where the user owes money (negative balance)
    filteredActiveGroups = activeByTime.filter(group => {
      const totalBalance = calculateTotalBalance(group);
      return totalBalance !== null && totalBalance < 0;
    });
  } else if (filterType === 'owed') {
    // Groups where the user is owed money (positive balance)
    filteredActiveGroups = activeByTime.filter(group => {
      const totalBalance = calculateTotalBalance(group);
      return totalBalance !== null && totalBalance > 0;
    });
  }
  
  // For the inactive groups, we consider both time-based inactive and settled groups
  const settledGroups = groups.filter(isGroupSettled);
  const inactiveGroups = groups.filter(group => isGroupInactive(group) || isGroupSettled(group));
  
  return {
    activeGroups: filteredActiveGroups,
    inactiveGroups: showInactiveGroups ? inactiveGroups : [],
    hasInactiveGroups: inactiveGroups.length > 0,
    settledGroups: settledGroups
  };
};

// Filter function for friends
export const getFilteredFriends = (friends, filterType = 'all') => {
  if (filterType === 'all') {
    return friends;
  } else if (filterType === 'outstanding') {
    return friends.filter(friend => 
      friend.balance && friend.balance.length > 0 && friend.balance[0].amount !== 0
    );
  } else if (filterType === 'owe') {
    return friends.filter(friend => 
      friend.balance && friend.balance.length > 0 && friend.balance[0].amount < 0
    );
  } else if (filterType === 'owed') {
    return friends.filter(friend => 
      friend.balance && friend.balance.length > 0 && friend.balance[0].amount > 0
    );
  }
  return friends;
};
