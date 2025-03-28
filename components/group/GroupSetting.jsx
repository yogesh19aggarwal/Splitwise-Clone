import { View, Text, TouchableOpacity, Alert, Image, Share } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { deleteGroup } from '../../services/deleteApi';
import { useDynamicTranslations } from '../../locals/i18';

const GroupSetting = () => {
    const i18n = useDynamicTranslations();
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

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Join our group "${groupName}" on https://deeplinking-beta.vercel.app/?id=${id}`,
            });
    
        } catch (error) {
            Alert.alert('Error', 'Failed to share group link');
        }
    };

    return (
        <View className="flex-1 bg-[#1c1c1e] p-4">
        
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-white text-lg">{`< ${i18n.t("back")}`}</Text>
                </TouchableOpacity>
                <Text className="text-white ml-6 text-lg font-bold">{`${i18n.t("group")} ${i18n.t("setting")}`}</Text>
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
                onPress={handleShare}
                className="border-2 border-[#0E9587] py-3 w-40 rounded-full items-center mt-6"
            >
                <Text className="text-white text-lg font-bold">{i18n.t("share")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleDelete}
                className="border-2 border-red-400 py-3 w-40 rounded-full items-center mt-6"
            >
                <Text className="text-red-400 text-lg font-bold">{i18n.t("delete_group")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GroupSetting;
