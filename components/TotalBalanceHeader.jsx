import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { calculateTotalBalance } from '../utility/calculateBalances';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '../locals/i18';

const TotalBalanceHeader = ({ groups, selectedFilter = 'all', setFilterMenuVisible }) => {
  const [totalOverallBalance, setTotalOverallBalance] = useState(0);

  useEffect(() => {
    if (!groups || !Array.isArray(groups)) {
      setTotalOverallBalance(0);
      return;
    }

    let total = 0;
    groups.forEach(group => {
      if (group) {
        const balance = calculateTotalBalance(group);
        
        // Only include balances that match the filter criteria
        if (balance !== null) {
          if (selectedFilter === 'all' || 
             (selectedFilter === 'outstanding' && Math.abs(balance) > 0) ||
             (selectedFilter === 'owe' && balance < 0) ||
             (selectedFilter === 'owed' && balance > 0)) {
            total += parseFloat(balance);
          }
        }
      }
    });

    setTotalOverallBalance(total);
  }, [groups, selectedFilter]);

  const textColorClass = totalOverallBalance > 0 ? 'text-teal-400' : 'text-orange-500';

  return (
    <View className="flex flex-row items-center justify-between mr-8 ml-2 mt-2">
      <View className="flex-row items-center ml-4">
        <Text className="text-xl text-white">
          {i18n.t("overall")},
          <Text className={textColorClass}>
            {totalOverallBalance > 0
              ? ` ${i18n.t("you_owe")} ₹${Math.abs(totalOverallBalance).toFixed(2)}`
              : ` ${i18n.t("you_are_owed")} ₹${Math.abs(totalOverallBalance).toFixed(2)}`}
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setFilterMenuVisible(true)}
        className="flex-row items-center"
      >
        <MaterialIcons name="filter-list" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
};

export default TotalBalanceHeader; 