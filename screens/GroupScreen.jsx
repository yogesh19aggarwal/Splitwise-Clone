import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getGroups } from '../services/getApi';
import GroupCard from '../components/group/GroupCard';
import TotalBalanceHeader from '../components/TotalBalanceHeader';
import GroupToggleSection from '../components/group/GroupToggleSection';
import { getFilteredGroups } from '../utility/groupUtils';
import { useGroupContext } from '../context/GlobalContext';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FilterMenu from '../components/FilterMenu';
import { useDynamicTranslations } from '../locals/i18';
import useNotification from '../notification/useNotification';
import * as Linking from 'expo-linking';

const GroupScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInactiveGroups, setShowInactiveGroups] = useState(false);
  const { groups, setGroups } = useGroupContext();
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const i18n = useDynamicTranslations();
  const { displayNotification, scheduleNotification } = useNotification();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

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
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedFilter !== 'all') {
      setShowInactiveGroups(false);
    }
  }, [selectedFilter]);

  const handleNewGroup = () => {
    navigation.navigate("Groups", {
      screen: "AddGroup",
    });
  };

  const handleAddExpense = () => {
    scheduleNotification(
      'Group Screen',
      "hello this is a custom notification",
      1,
      Linking.createURL('friends')
    );
  };

  const { activeGroups, settledGroups } = getFilteredGroups(groups, showInactiveGroups, selectedFilter);

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {loading ? (
        <Text className="text-white text-center mt-4">{i18n.t("loading")}</Text>
      ) : error ? (
        <Text className="text-white text-center mt-4">{i18n.t("error")}{error.message}</Text>
      ) : (
        <>
          <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
            <TotalBalanceHeader
              groups={groups}
              selectedFilter={selectedFilter}
              setFilterMenuVisible={setFilterMenuVisible}
            />

            {activeGroups.length > 0 ? (
              activeGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))
            ) : (
              <Text className="text-white text-center mt-4">
                {i18n.t("no_group_match")}
              </Text>
            )}

            {selectedFilter === 'all' && settledGroups && settledGroups.length > 0 && (
              <GroupToggleSection
                showInactiveGroups={showInactiveGroups}
                setShowInactiveGroups={setShowInactiveGroups}
                inactiveGroupsCount={settledGroups.length}
              />
            )}

            {showInactiveGroups && settledGroups && settledGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}

            {showInactiveGroups && settledGroups && settledGroups.length > 0 &&
              <View className="flex flex-row justify-center mb-28">
                <TouchableOpacity
                  onPress={handleNewGroup}
                  className="border border-teal-200 py-2 px-4 w-60 h-14 gap-4 flex flex-row justify-center"
                >
                  <AntDesign name="addusergroup" size={24} color="white" />
                  <Text className="text-teal-200 text-lg">
                    {i18n.t("start_a_new_group")}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </ScrollView>

          <FilterMenu
            isVisible={filterMenuVisible}
            onClose={() => setFilterMenuVisible(false)}
            type="groups"
            selectedFilter={selectedFilter}
            onFilterChange={(filter) => setSelectedFilter(filter)}
          />
        </>
      )}

      <TouchableOpacity onPress={handleAddExpense} className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">{i18n.t("add_expense")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GroupScreen;
