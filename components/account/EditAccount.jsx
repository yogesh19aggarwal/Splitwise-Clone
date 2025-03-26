import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateUser } from '../../services/postApi';

const EditAccount = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveChanges = async () => {
    const userData = {};

    if (firstName) userData.first_name = firstName;
    if (lastName) userData.last_name = lastName;
    if (email) userData.email = email;
    if (password) userData.password = password;

    try {
      await updateUser(id, userData); 
      Alert.alert('Success', 'Account updated successfully!');
      navigation.goBack(); 
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to update account. Please try again.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#1c1c1e] p-4">

      <View className="mb-4">
        <Text className="text-gray-400 text-sm mb-1">Full Name</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded"
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded mt-2"
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-400 text-sm mb-1">Email Address</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded"
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-400 text-sm mb-1">Password</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded"
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-full items-center mt-6"
        onPress={()=>handleSaveChanges()}
      >
        <Text className="text-white text-lg font-bold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditAccount;
