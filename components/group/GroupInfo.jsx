import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getGroupById } from '../../services/getApi';
import { useNavigation } from '@react-navigation/native';
import { calculateTotalBalance, calculatePeopleBalance } from '../../utility/calculateBalances';

import GroupHeader from './GroupHeader';
import GroupProfile from './GroupProfile';
import GroupActions from './GroupActions';
import ExpensesList from './ExpensesList';
import { Ionicons } from '@expo/vector-icons';

const GroupInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [groupInfo, setGroupInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceData, setBalanceData] = useState({
    totalBalance: null,
    oweToPeople: {},
    lentToPeople: {},
    isSettledUp: true
  });

  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        const group = await getGroupById(id);
        setGroupInfo(group.group);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };

    getGroupInfo();
  }, [id]);

  useEffect(() => {
    if (groupInfo && !loading) {
      const totalBalance = calculateTotalBalance(groupInfo);
      const { oweToPeople, lentToPeople } = calculatePeopleBalance(groupInfo, groupInfo.simplify_by_default);
      const isSettledUp = totalBalance === null || (Math.abs(totalBalance) < 1);

      setBalanceData({
        totalBalance,
        oweToPeople,
        lentToPeople,
        isSettledUp
      });
    }
  }, [groupInfo, loading]);

  const handleExpense = () =>{
    navigation.navigate('AddExpense', {id: id, groupName: groupInfo?.name, groupImage: groupInfo?.avatar?.small});
  };

  return (
    <View className="flex-1 bg-[#1c1c1e]">
      <GroupHeader 
        coverPhoto={groupInfo?.cover_photo?.xlarge}
        id={groupInfo?.id}
        name={groupInfo?.name}
        image={groupInfo?.avatar?.medium}
      />
      
      <GroupProfile 
        groupInfo={groupInfo} 
        balanceData={balanceData} 
      />
      
      <GroupActions />
      
      <ScrollView className="px-4">
        <ExpensesList loading={loading} />
      </ScrollView>

      <TouchableOpacity onPress={handleExpense} className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">Add expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupInfo;
