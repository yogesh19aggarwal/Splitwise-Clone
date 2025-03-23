import React from 'react';
import { View, Text } from 'react-native';
import GroupExpenseItem from './GroupExpenseItem';

const ExpensesList = ({ loading }) => {
  if (loading) {
    return <Text className="text-white text-center">Loading...</Text>;
  }

  return (
    <>
      <GroupExpenseItem
        month="Mar"
        day="21"
        title="Hell"
        isPaid={true}
        amount="15.00"
        paymentInfo="You paid ₹15.00"
      />

      <GroupExpenseItem
        month="Mar"
        day="20"
        title="Checking"
        isPaid={false}
        amount="33.34"
        paymentInfo="Sameer c. paid ₹100.00"
      />

      <View className="items-center py-4">
        <Text className="text-gray-400 text-base text-center">
          All expenses before this date have been settled up.
        </Text>
        <Text className="text-gray-400 text-base text-center">
          Tap to show settled expenses.
        </Text>
      </View>
    </>
  );
};

export default ExpensesList; 