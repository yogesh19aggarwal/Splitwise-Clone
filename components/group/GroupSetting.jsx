import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { deleteGroup } from '../../services/deleteApi';

const GroupSetting = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, groupName, groupImage } = route.params;

    const handleDelete = async () => {
        try {
            await deleteGroup(id);
            Alert.alert('Success', 'Group deleted successfully');
            navigation.navigate('GroupScreen');
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to delete group. Please try again.');
        }
    };

    return (
        <View className="flex-1 bg-[#1c1c1e] p-4">
        
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-white text-lg">{'< Back'}</Text>
                </TouchableOpacity>
                <Text className="text-white ml-6 text-lg font-bold">Group Settings</Text>
            </View>

            <View className="flex-row items-center mb-8">
                {groupImage ? (
                    <Image
                        source={{ uri: groupImage }}
                        className="w-12 h-12 rounded-md"
                    />
                ) : (
                    <View className="w-12 h-12 bg-orange-500 rounded-full" />
                )}
                <Text className="text-white text-xl font-bold ml-4">{groupName}</Text>
            </View>

            <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 py-3 rounded-full items-center mt-6"
            >
                <Text className="text-white text-lg font-bold">Delete Group</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GroupSetting;
