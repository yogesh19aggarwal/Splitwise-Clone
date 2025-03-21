import { SafeAreaView, FlatList, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import { getFriends } from '../services/getApi';

const FriendsScreen = () => {

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
            <>
              <View className="flex flex-row items-center justify-between mr-8 ml-2 mt-2">
                <Text className="text-2xl text-white p-4">Overall, you owe $33</Text>
                <AntDesign name="menufold" size={24} color="white" />
              </View>

              <FlatList
                className="mt-4"
                data={friends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex flex-row items-center justify-between p-4">
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
                )}
              />
            </>
      }
    </SafeAreaView>
  )
};

export default FriendsScreen;
