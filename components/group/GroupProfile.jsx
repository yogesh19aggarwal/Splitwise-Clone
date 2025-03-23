import React from 'react';
import { View, Text, Image } from 'react-native';

const GroupProfile = ({ groupInfo, balanceData }) => {
  const getBalanceText = (totalBalance) => {
    if (totalBalance === null) return "no expenses";
    if (Math.abs(totalBalance) < 1) return "settled up";

    return totalBalance > 0
      ? `you are owed ₹${Math.abs(totalBalance).toFixed(2)}`
      : `you owe ₹${Math.abs(totalBalance).toFixed(2)}`;
  };

  const getBalanceTextColor = (totalBalance) => {
    if (totalBalance === null || Math.abs(totalBalance) < 1) return 'text-gray-400';
    return totalBalance > 0 ? 'text-[#34C759]' : 'text-[#FF9200]';
  };

  const balanceText = getBalanceText(balanceData.totalBalance);
  const balanceTextColor = getBalanceTextColor(balanceData.totalBalance);

  return (
    <View className="items-start pt-1 pb-2 ml-8 bg-[#1c1c1e]">
      <View className="w-24 h-24 items-center rounded-lg overflow-hidden mb-4 mt-[-28px] border-4 border-black">
        <Image
          source={{ uri: groupInfo?.avatar?.large }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <Text className="text-white text-3xl font-semibold mb-2">{groupInfo?.name}</Text>

      <Text className={`text-lg ${balanceTextColor} mb-4`}>{balanceText}</Text>

      {!balanceData.isSettledUp && (
        <View className="mb-4">
          {Object.keys(balanceData.oweToPeople).length > 0 &&
            Object.entries(balanceData.oweToPeople).map(([person, amount]) => (
              <Text key={person} className="text-white text-lg">
                You owe {person} <Text className="text-[#FF9200]">₹{amount.toFixed(2)}</Text>
              </Text>
            ))
          }

          {Object.keys(balanceData.lentToPeople).length > 0 &&
            Object.entries(balanceData.lentToPeople).map(([person, amount]) => (
              <Text key={person} className="text-white text-lg">
                {person} owes you <Text className="text-[#34C759]">₹{amount.toFixed(2)}</Text>
              </Text>
            ))
          }
        </View>
      )}
    </View>
  );
};

export default GroupProfile; 