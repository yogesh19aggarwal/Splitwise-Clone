import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { calculateTotalBalance } from '../utility/calculateBalances';
import FilterMenu from './FilterMenu';

const TotalBalanceHeader = ({ groups, type = 'groups' }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
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
        if (balance !== null) {
          total += parseFloat(balance);
        }
      }
    });
    
    setTotalOverallBalance(total);
  }, [groups]);
  
  const textColorClass = totalOverallBalance > 0 ? 'text-teal-400' : 'text-orange-500';
  
  return (
    <View className="flex flex-row items-center justify-between mr-8 ml-2 mt-2">
      <View className="flex-row items-center ml-4">
        <Text className="text-xl text-white">
          Overall,
          <Text className={textColorClass}>
            {totalOverallBalance > 0 
              ? ` you are owed ₹${Math.abs(totalOverallBalance).toFixed(2)}`
              : ` you owe ₹${Math.abs(totalOverallBalance).toFixed(2)}`}
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
        <AntDesign name="menufold" size={24} color="white" />
      </TouchableOpacity>
      
      <FilterMenu 
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        type={type}
      />
    </View>
  );
};

export default TotalBalanceHeader; 