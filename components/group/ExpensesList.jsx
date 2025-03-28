import React from 'react';
import { View, Text } from 'react-native';
import GroupExpenseItem from './GroupExpenseItem';
import i18n from '../../locals/i18';

const ExpensesList = ({ loading }) => {
  if (loading) {
    return <Text className="text-white text-center">Loading...</Text>;
  }

  return (
    <>
      <GroupExpenseItem
        month="Mar"
        day="21"
        title={i18n.t("hall")}
        isPaid={true}
        amount="15.00"
        paymentInfo={`${i18n.t("you_paid")} ₹15.00`}
      />

      <GroupExpenseItem
        month="Mar"
        day="20"
        title={i18n.t("checking")}
        isPaid={false}
        amount="33.34"
        paymentInfo={`Sameer c. ${i18n.t("you_paid")} ₹100.00`}
      />

      <View className="items-center py-4">
        <Text className="text-gray-400 text-base text-center">
          {i18n.t("all_expense_before_date")}
        </Text>
        <Text className="text-gray-400 text-base text-center">
          {i18n.t("tap_to_show")}
        </Text>
      </View>
    </>
  );
};

export default ExpensesList; 