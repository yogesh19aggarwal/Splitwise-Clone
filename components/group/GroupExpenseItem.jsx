import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupExpenseItem = ({ month, day, title, isPaid, amount, paymentInfo }) => {
  const isPositive = isPaid;
  const statusColor = isPositive ? 'text-[#34C759]' : 'text-[#FF9200]';
  const statusText = isPositive ? 'you lent' : 'you borrowed';
  
  return (
    <View className="flex-row mb-6">
      <View className="mr-3 items-center">
        <Text className="text-gray-400 text-lg">{month}</Text>
        <Text className="text-gray-400 text-3xl">{day}</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="flex-row">
          <View className="w-12 h-12 bg-gray-700 rounded-md items-center justify-center mr-3">
            <Ionicons name="receipt-outline" size={20} color="white" />
          </View>

          <View className="flex-1">
            <View className="flex-row justify-between">
              <Text className="text-white text-xl">{title}</Text>
              <Text className={`${statusColor} text-lg`}>{statusText}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-400">{paymentInfo}</Text>
              <Text className={`${statusColor} text-xl`}>₹{amount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupExpenseItem; 