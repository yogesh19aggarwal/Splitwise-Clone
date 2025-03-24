import React from 'react';
import { View, Text, Image } from 'react-native';

const GroupProfile = ({ groupInfo, balanceData }) => {
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