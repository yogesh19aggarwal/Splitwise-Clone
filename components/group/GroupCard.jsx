import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { calculateTotalBalance, calculatePeopleBalance } from '../../utility/calculateBalances';

const GroupCard = ({ group }) => {
  const navigation = useNavigation();
  const [balanceData, setBalanceData] = useState({
    totalBalance: null,
    oweToPeople: {},
    lentToPeople: {},
    isSettledUp: true
  });

  // Calculate balances once group data is available
  useEffect(() => {
    if (group) {
      const totalBalance = calculateTotalBalance(group);
      const { oweToPeople, lentToPeople } = calculatePeopleBalance(group, group.simplify_by_default);
      const isSettledUp = totalBalance === null || (Math.abs(totalBalance) < 1);
      
      setBalanceData({
        totalBalance,
        oweToPeople,
        lentToPeople,
        isSettledUp
      });
    }
  }, [group]);

  const getBalanceText = (totalBalance) => {
    if (totalBalance === null) return "no expenses";
    if (Math.abs(totalBalance) < 1) return "settled up";

    return totalBalance > 0
      ? `you are owed ₹${Math.abs(totalBalance).toFixed(2)}`
      : `you owe ₹${Math.abs(totalBalance).toFixed(2)}`;
  };

  const getBalanceTextColor = (totalBalance) => {
    if (totalBalance === null || Math.abs(totalBalance) < 1) return 'text-gray-400';
    return totalBalance > 0 ? 'text-teal-400' : 'text-orange-500';
  };

  const handlePress = () => {
    navigation.navigate('GroupInfo', {id: group.id});
  };

  const balanceText = getBalanceText(balanceData.totalBalance);
  const balanceTextColor = getBalanceTextColor(balanceData.totalBalance);

  if (!group) {
    return null;
  }

  return (
    <TouchableOpacity className="p-4" onPress={handlePress}>
      <View className="flex flex-row items-center mb-2">
        <Image
          className="w-28 h-24 rounded-2xl mr-4"
          source={{ uri: group.avatar?.medium }}
        />
        <View>
          <Text className="text-lg text-white mb-1">{group.name}</Text>
          <Text className={`text-base ${balanceTextColor}`}>{balanceText}</Text>

          {!balanceData.isSettledUp && (
            <View className="mt-1">
              {Object.keys(balanceData.oweToPeople).length > 0 &&
                Object.entries(balanceData.oweToPeople).map(([person, amount]) => (
                  <Text key={person} className="text-white">
                    You owe {person} <Text className="text-orange-500">₹{amount.toFixed(2)}</Text>
                  </Text>
                ))
              }

              {Object.keys(balanceData.lentToPeople).length > 0 &&
                Object.entries(balanceData.lentToPeople).map(([person, amount]) => (
                  <Text key={person} className="text-white">
                    {person} owes you <Text className="text-teal-400">₹{amount.toFixed(2)}</Text>
                  </Text>
                ))
              }
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard; 