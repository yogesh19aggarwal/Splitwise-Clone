import { View, ScrollView, TouchableOpacity, Text, Image, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { getFriendById } from '../../services/getApi';

const FriendInfo = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const [friendInfo, setFriendInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriendInfo = async () => {
            try {
                const response = await getFriendById(id); // Call the API
                setFriendInfo(response.friend);
            } catch (err) {
                console.error('Error fetching friend info:', err);
                setError(err);
                Alert.alert('Error', 'Failed to fetch friend details.');
            } 
            setLoading(false);
        };

        fetchFriendInfo();
    }, [id]);

    const handleBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <View className="flex-1 bg-[#1c1c1e] justify-center items-center">
                <Text className="text-white text-lg">Loading...</Text>
            </View>
        );
    };

    if (error) {
        return (
            <View className="flex-1 bg-[#1c1c1e] justify-center items-center">
                <Text className="text-white text-lg">Error loading friend details.</Text>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-[#1c1c1e]">
            <ImageBackground
                source={{ uri: friendInfo.picture.large }}
                className="h-32"
                resizeMode='cover'
            >
                <View className="flex-row justify-between items-center px-4 mt-4">
                    <TouchableOpacity onPress={handleBack}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="settings" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View className="ml-12 mt-4">
                <Image
                    source={{ uri: friendInfo?.picture?.large }}
                    className="w-24 h-24 rounded-full mt-[-50]"
                />
                <Text className="text-white text-xl font-bold mt-2">
                    {friendInfo?.first_name} {friendInfo?.last_name}
                </Text>
                <Text className="text-gray-400 text-base">
                    {friendInfo?.balance.length > 0
                        ? `Balance: ${friendInfo.balance[0].amount}`
                        : 'No balance information'}
                </Text>
            </View>

            <View className="mb-10 mt-4">
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity className="bg-[#FF9200] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
                        <Text className="text-white text-lg font-medium">Settle up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
                        <Text className="text-white text-lg font-medium">Remind...</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center bg-[#2A2A2D] py-4 px-6 rounded-lg mx-2 justify-center w-48 h-14">
                        <Ionicons name="diamond" size={20} color="purple" />
                        <Text className="text-white text-lg font-medium ml-2">Charts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
                        <Text className="text-white text-lg font-medium">Convert to INR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-[#2A2A2D] px-6 rounded-lg mx-2 items-center justify-center w-48 h-14">
                        <Text className="text-white text-lg font-medium">Export</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            <ScrollView className="px-4 mt-6">
                <Text className="text-white text-lg font-bold mb-4">March 2025</Text>
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                        <Ionicons name="document-text-outline" size={24} color="white" />
                        <View className="ml-3">
                            <Text className="text-white text-base">Meenakshi mall</Text>
                            <Text className="text-gray-400 text-sm">Shared group</Text>
                        </View>
                    </View>
                    <Text className="text-green-500 text-base">settled up</Text>
                </View>
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                        <Ionicons name="receipt-outline" size={24} color="white" />
                        <View className="ml-3">
                            <Text className="text-white text-base">Hell</Text>
                            <Text className="text-gray-400 text-sm">You paid ₹15.00</Text>
                        </View>
                    </View>
                    <Text className="text-green-500 text-base">you lent ₹15.00</Text>
                </View>
            </ScrollView>

            <TouchableOpacity className="absolute bottom-4 right-4 bg-[#0E9587] py-3 px-6 rounded-full flex-row items-center justify-center">
                <Ionicons name="receipt-outline" size={20} color="white" />
                <Text className="text-white ml-2 text-lg">Add expense</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FriendInfo;