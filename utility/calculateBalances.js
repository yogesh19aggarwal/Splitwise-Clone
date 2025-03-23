export function calculateTotalBalance(group) {
  const userId = 67090865;
  
  if (!group || !group.members || !group.members.length) {
    if (group && group.name === "Non-group expenses") {
      return 0;
    }
    return null;
  }

  let totalAmount = 0;
  let hasExpenses = false;

  group.members.forEach(member => {
    if (member.id === userId && member.balance && member.balance.length > 0) {
      hasExpenses = true;
      totalAmount = parseFloat(member.balance[0].amount);
    }
  });

  return hasExpenses ? totalAmount : null;
};

export function calculatePeopleBalance(group, simplifyDebt = false) {
  const userId = 67090865;
  let oweToPeople = {};
  let lentToPeople = {};

  if (!group || !group.members) {
    return { oweToPeople, lentToPeople };
  }

  const formatPersonName = (member) => {
    return `${member.first_name} ${member.last_name ? member.last_name.charAt(0) + '.' : ''}`.trim();
  };

  if (simplifyDebt) {

    let netAmount = 0;
    group.members.forEach(member => {
      if (member.id !== userId && member.balance && member.balance.length > 0) {
        member.balance.forEach(balance => {
          netAmount += parseFloat(balance.amount);
        });
      }
    });

    let primaryPerson = null;
    for (const member of group.members) {
      if (member.id !== userId && member.balance && member.balance.length > 0) {

        let memberBalance = member.balance.reduce((sum, balance) => sum + parseFloat(balance.amount), 0);
        if (memberBalance !== 0) {
          primaryPerson = member;
          break;
        }
      }
    }

    if (!primaryPerson) {
      primaryPerson = group.members.find(member => member.id !== userId) || { first_name: "Group" };
    }

    const primaryPersonName = formatPersonName(primaryPerson);

    if (netAmount > 0) {
      oweToPeople[primaryPersonName] = netAmount;
    } else if (netAmount < 0) {
      lentToPeople[primaryPersonName] = Math.abs(netAmount);
    }
  } else {

    group.members.forEach(member => {
      if (member.id !== userId && member.balance && member.balance.length > 0) {

        const memberNetBalance = member.balance.reduce(
          (sum, balance) => sum + parseFloat(balance.amount),
          0
        );

        if (memberNetBalance !== 0) {
          const personName = formatPersonName(member);

          if (memberNetBalance > 0) {
            oweToPeople[personName] = memberNetBalance;
          } else {
            lentToPeople[personName] = Math.abs(memberNetBalance);
          }
        }
      }
    });
  }

  return { oweToPeople, lentToPeople };
};

