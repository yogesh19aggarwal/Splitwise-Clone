import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupActions = () => {
  return (
    <View className="mb-10">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity className="bg-[#FF9200] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
          <Text className="text-white text-lg font-medium">Settle up</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-[#2A2A2D] py-4 px-6 rounded-lg mx-2 justify-center w-48 h-14">
          <Ionicons name="diamond" size={20} color="purple" />
          <Text className="text-white text-lg font-medium ml-2">Charts</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
          <Text className="text-white text-lg font-medium">Balances</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
          <Text className="text-white text-lg font-medium">Totals</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
          <Text className="text-white text-lg font-medium">Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
          <Text className="text-white text-lg font-medium">Activity</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GroupActions; 