import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getFriends } from '../services/getApi';
import TotalBalanceHeader from '../components/TotalBalanceHeader';
import { useGroupContext } from '../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';

const FriendsScreen = () => {
  const { groups } = useGroupContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getFriends();
        setFriends(response.friends);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {
        loading ? <Text>Loading...</Text> :
          error ? <Text>Error: {error.message}</Text> :
            <ScrollView>
              <TotalBalanceHeader groups={groups} type="friends" />

              {friends.map((item) => (
                <View key={item.id} className="flex flex-row items-center justify-between p-4">
                  <View className="flex flex-row items-center">
                    <Image
                      className="w-12 h-12 rounded-full mr-4"
                      source={{ uri: item.picture.medium }}
                    />
                    <View className="flex flex-row gap-2">
                      <Text className="text-lg text-white">{item.first_name}</Text>
                      <Text className="text-lg text-white">{item.last_name}</Text>
                    </View>
                  </View>

                  <View>
                    {item.balance.length != 0 ? (
                      item.balance[0].amount < 0 ? (
                        <View className="flex flex-col items-center">
                          <Text className="text-base text-orange-500">you owe</Text>
                          <Text className="text-base text-orange-500">₹{Math.abs(item.balance[0].amount)}</Text>
                        </View>
                      ) : (
                        <View className="flex flex-col items-center">
                          <Text className="text-base text-green-400">you owe</Text>
                          <Text className="text-base text-green-400">₹{Math.abs(item.balance[0].amount).toFixed(2)}</Text>
                        </View>
                      )
                    ) : (
                      <Text className="text-sm text-white">no expense</Text>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
      }
      <TouchableOpacity className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">Add expense</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
};

export default FriendsScreen;


