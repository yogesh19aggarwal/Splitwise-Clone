import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { getUser } from '../services/getApi';
import { useGroupContext } from '../context/GlobalContext';
import { Ionicons, MaterialIcons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {

  const { user, error, loading } = useGroupContext();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#222222] justify-center items-center">
        <ActivityIndicator size="large" color="#5bc5a7" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#222222] justify-center items-center">
        <Text className="text-white text-lg">Error loading profile: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#222222]">
      <ScrollView>
        <Text className="text-2xl text-white ml-6">Account</Text>
       
        <View className="pt-4 pb-6 px-6 border-b border-gray-700">
          <View className="flex-row items-center">
            <View className="mr-4">
              {user?.picture ? (
                <Image 
                  source={{ uri: user.picture.medium }} 
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <View className="w-20 h-20 rounded-full bg-gray-600 justify-center items-center">
                  <Text className="text-white text-3xl">{user?.first_name?.charAt(0)}</Text>
                </View>
              )}
              <TouchableOpacity className="absolute bottom-0 right-0 bg-[#5bc5a7] rounded-full p-1">
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-white text-2xl font-semibold">{user?.first_name || 'User'}</Text>
              <Text className="text-gray-400">{user?.email || 'No email'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <AntDesign name="qrcode" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Scan code</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <FontAwesome name="diamond" size={24} color="#a461e5" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Splitwise Pro</Text>
          </View>
          
        </TouchableOpacity>

        <View className="mt-6 px-6 mb-2">
          <Text className="text-white text-sm">Preferences</Text>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <MaterialIcons name="email" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Email settings</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <Ionicons name="notifications" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Device and push notification settings</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <Feather name="lock" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Security</Text>
          </View>
          
        </TouchableOpacity>

        <View className="mt-6 px-6 mb-2">
          <Text className="text-white text-sm">Feedback</Text>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <AntDesign name="star" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Rate Splitwise</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-700">
          <AntDesign name="questioncircle" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">Contact Splitwise support</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 mt-6  ">
          <AntDesign name="logout" size={24} color="#5bc5a7" className="mr-4" />
          <View className="flex-1">
            <Text className="text-[#5bc5a7] text-lg">Log out</Text>
          </View>
        </TouchableOpacity>

        <View className="py-6 px-4 items-center">
          <Text className="text-gray-500 text-center">
            Made with ✨ in Providence, RI, USA
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            Copyright © 2025 Splitwise, Inc.
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            P.S. Bunnies!
          </Text>
          <TouchableOpacity className="mt-4">
            <Text className="text-[#5bc5a7] text-center">
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({})