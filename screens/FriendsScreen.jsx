import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getFriends } from '../services/getApi';
import TotalBalanceHeader from '../components/TotalBalanceHeader';
import { useGroupContext } from '../context/GlobalContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import FilterMenu from '../components/FilterMenu';
import { getFilteredFriends } from '../utility/groupUtils';
import FriendCard from '../components/friends/FriendCard';

const FriendsScreen = () => {
  const { groups } = useGroupContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredFriends = getFilteredFriends(friends, selectedFilter);

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {
        loading ? <Text className="text-white text-center mt-4">Loading...</Text> :
        error ? <Text className="text-white text-center mt-4">Error: {error.message}</Text> :
        <>

          <ScrollView>
            <TotalBalanceHeader groups={groups} selectedFilter={selectedFilter} setFilterMenuVisible={setFilterMenuVisible}/>

            {filteredFriends.length > 0 ? (
              filteredFriends.map((item) => (
                <FriendCard key={item.id} friend={item} />
              ))
            ) : (
              <Text className="text-white text-center mt-4">No friends match the selected filter.</Text>
            )}
          </ScrollView>

          <FilterMenu 
            isVisible={filterMenuVisible}
            onClose={() => setFilterMenuVisible(false)}
            type="friends"
            selectedFilter={selectedFilter}
            onFilterChange={(filter) => setSelectedFilter(filter)}
          />
        </>
      }
      <TouchableOpacity className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">Add expense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
};

export default FriendsScreen;


