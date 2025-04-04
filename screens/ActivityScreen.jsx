import { SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNotifications } from '../services/getApi';
import ActivityCard from '../components/activity/ActivityCard';
import { Ionicons } from '@expo/vector-icons';

const ActivityScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const getNotificationFromAPI = async () => {
    setLoading(true);
    setError(null); // Reset error state before new request
    try {
      const res = await getNotifications();
      setNotifications(res.notifications);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.message || 'Failed to load activities');
    }
    setLoading(false);
  }

  useEffect(() => {
    getNotificationFromAPI();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f]">
      <Text className="text-white text-2xl font-medium ml-4 mt-4">
        Activity
      </Text>

      {loading && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white mt-4">Loading activities...</Text>
        </View>
      )}

      {!loading && error && (
        <View className="flex-1 justify-center items-center px-4">
          <Ionicons name="alert-circle-outline" size={50} color="#FF5252" />
          <Text className="text-white text-center mt-4 text-lg">{error}</Text>
          <TouchableOpacity 
            className="mt-6 bg-[#0E9587] py-2 px-6 rounded-full"
            onPress={getNotificationFromAPI}
          >
            <Text className="text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <ScrollView className="mt-2 px-4" showsVerticalScrollIndicator={false}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ActivityCard key={index} notification={notification} />
            ))
          ) : (
            <View className="flex-1 justify-center items-center mt-10">
              <Ionicons name="notifications-off-outline" size={50} color="#888" />
              <Text className="text-white text-center mt-4">No activity to show</Text>
            </View>
          )}
          <View className="h-24" />
        </ScrollView>
      )}

      <TouchableOpacity className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
        <Ionicons name="receipt-outline" size={20} color="white" />
        <Text className="text-white ml-2 text-lg">Add expense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ActivityScreen;