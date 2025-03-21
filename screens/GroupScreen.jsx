import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
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
        setGroups(response.groups);
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
                <Text className="text-xl text-white p-4">Overall, you owe $33</Text>
                <AntDesign name="menufold" size={24} color="white" />
              </View>

              <FlatList
                className="mt-4"
                data={groups}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex flex-row items-center p-4">
                    <Image
                      className="w-32 h-32 rounded-2xl mr-4"
                      source={{ uri: item.avatar.medium }}
                    />
                    <View>
                      <Text className="text-lg text-white">{item.name}</Text>
                    </View>
                  </View>
                )}
              />
            </>
      }
    </SafeAreaView>
  )
};

export default GroupScreen;
