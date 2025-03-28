import { SafeAreaView, ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import { getFriends } from '../services/getApi';
import TotalBalanceHeader from '../components/TotalBalanceHeader';
import { useGroupContext } from '../context/GlobalContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import FilterMenu from '../components/FilterMenu';
import { getFilteredFriends } from '../utility/groupUtils';
import FriendCard from '../components/friends/FriendCard';
// import i18n from '../locals/i18';
import { useDynamicTranslations } from '../locals/i18';

const FriendsScreen = () => {
  const { groups } = useGroupContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const i18n = useDynamicTranslations();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  const getData = async () => {
    try {
      const response = await getFriends();
      setFriends(response.friends);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredFriends = getFilteredFriends(friends, selectedFilter);

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {
        loading ? <Text className="text-white text-center mt-4">{`${i18n.t("loading")}...`}</Text> :
          error ? <Text className="text-white text-center mt-4">{`${i18n.t("error")}: ${error.message}`}</Text> :
            <>
              <ScrollView refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}>
                <TotalBalanceHeader groups={groups} selectedFilter={selectedFilter} setFilterMenuVisible={setFilterMenuVisible} />

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
        <Text className="text-white ml-2 text-lg">{i18n.t("add_expense")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FriendsScreen;


