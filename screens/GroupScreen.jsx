import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getGroups } from '../services/getApi';
import GroupCard from '../components/group/GroupCard';
import TotalBalanceHeader from '../components/TotalBalanceHeader';
import GroupToggleSection from '../components/group/GroupToggleSection';
import { getFilteredGroups } from '../utility/groupUtils';
import { useGroupContext } from '../context/GlobalContext';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const GroupScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInactiveGroups, setShowInactiveGroups] = useState(false);
  const { groups, setGroups } = useGroupContext();

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

  const { activeGroups, inactiveGroups, hasInactiveGroups } = getFilteredGroups(groups, showInactiveGroups);

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      {loading ? (
        <Text className="text-white text-center mt-4">Loading...</Text>
      ) : error ? (
        <Text className="text-white text-center mt-4">Error: {error.message}</Text>
      ) : (
        <ScrollView>
          <TotalBalanceHeader groups={groups} />

          {activeGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}

          {hasInactiveGroups && (
            <GroupToggleSection
              showInactiveGroups={showInactiveGroups}
              setShowInactiveGroups={setShowInactiveGroups}
              inactiveGroupsCount={inactiveGroups.length}
            />
          )}

          {showInactiveGroups && inactiveGroups.map(group => (
            <>
              <GroupCard key={group.id} group={group} />
            </>
          ))}

          {showInactiveGroups &&
            <View className="flex flex-row justify-center mb-28">
              <TouchableOpacity
                className="border border-teal-200 py-2 px-4 w-60 h-14 gap-4 flex flex-row justify-center"
              >
                <AntDesign name="addusergroup" size={24} color="white" />
                <Text className="text-teal-200 text-lg">
                  Start a new group
                </Text>
              </TouchableOpacity>
            </View>
          }

        </ScrollView>
      )}

      <TouchableOpacity className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">Add expense</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default GroupScreen;
