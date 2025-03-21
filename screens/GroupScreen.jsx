import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getGroups } from '../services/getApi';

const GroupScreen = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getGroups();
        const sortedGroups = response.groups.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setGroups(sortedGroups);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  function calculateTotalBalance(group) {
    const userId = 67090865;
    let totalAmount = 0;
    let hasExpenses = false;

    group.members.forEach(member => {
      if (member.id !== userId && member.balance.length > 0) {
        hasExpenses = true;
        member.balance.forEach(balance => {
          totalAmount += parseFloat(balance.amount);
        });
      }
    });

    if (!hasExpenses) return null;
    return totalAmount;
  }

  function getBalanceText(totalBalance) {
    if (totalBalance === null) return "no expenses";
    if (totalBalance < 1 && totalBalance > -1) return "settled up";
    if (totalBalance < 0) return `You are owed ₹${totalBalance.toFixed(2)}`;
    return `You owe ₹${Math.abs(totalBalance).toFixed(2)}`;
  }

  function getBalanceTextColor(totalBalance) {
    if (totalBalance === null) return 'text-gray-400';
    if (totalBalance < 1 && totalBalance > -1) return 'text-gray-400';
    if (totalBalance < 0) return 'text-blue-400';
    return 'text-orange-500';
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {
        loading ? <Text className="text-white text-center mt-4">Loading...</Text> :
          error ? <Text className="text-white text-center mt-4">Error: {error.message}</Text> :
            <ScrollView>
              <View className="flex flex-row items-center justify-between mr-8 ml-2 mt-2">
                <Text className="text-xl text-white p-4">Overall, you owe $33</Text>
                <AntDesign name="menufold" size={24} color="white" />
              </View>

              {groups.map((item) => {
                const totalBalance = calculateTotalBalance(item);
                const balanceText = getBalanceText(totalBalance);
                const balanceTextColor = getBalanceTextColor(totalBalance);

                return (
                  <View key={item.id} className="flex flex-row items-center p-4">
                    <Image
                      className="w-32 h-32 rounded-2xl mr-4"
                      source={{ uri: item.avatar.medium }}
                    />
                    <View>
                      <Text className="text-lg text-white mb-1">{item.name}</Text>
                      <Text className={`text-base ${balanceTextColor}`}>{balanceText}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
      }
    </SafeAreaView>
  );
};

export default GroupScreen;
