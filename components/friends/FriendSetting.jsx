import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { removeFriend } from '../../services/deleteApi';
import i18n from '../../locals/i18';

const GroupSetting = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, firstName, lastName, friendImage } = route.params;

    const handleDelete = async () => {
        try {
            await removeFriend(id);
            Alert.alert('Success', 'Friend Removed successfully');
            navigation.navigate('FriendsScreen');
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to remove friend. Please try again.');
        }
    };

    return (
        <View className="flex-1 bg-[#1c1c1e] p-4">
        
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-white text-lg">{`< ${i18n.t("back")}`}</Text>
                </TouchableOpacity>
                <Text className="text-white ml-6 text-lg font-bold">{`${i18n.t("friend")} ${i18n.t("setting")}`}</Text>
            </View>

            <View className="flex-row items-center mb-8">
                {friendImage ? (
                    <Image
                        source={{ uri: friendImage }}
                        className="w-12 h-12 rounded-md"
                    />
                ) : (
                    <View className="w-12 h-12 bg-orange-500 rounded-full" />
                )}
                <Text className="text-white text-xl font-bold ml-4">{`${firstName} ${lastName? lastName: ''}`}</Text>
            </View>

            <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 py-3 rounded-full items-center mt-6"
            >
                <Text className="text-white text-lg font-bold">{i18n.t("remove_friend")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GroupSetting;
