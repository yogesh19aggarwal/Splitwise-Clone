import { View, Text, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const FriendCard = ({ friend }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("FriendInfo", { id: friend.id });
    };

    return (
        <TouchableOpacity key={friend.id} onPress={handlePress} className="flex flex-row items-center justify-between p-4">
            <View className="flex flex-row items-center">
                <Image
                    className="w-12 h-12 rounded-full mr-4"
                    source={{ uri: friend.picture.medium }}
                />
                <View className="flex flex-row gap-2">
                    <Text className="text-lg text-white">{friend.first_name}</Text>
                    <Text className="text-lg text-white">{friend.last_name}</Text>
                </View>
            </View>

            <View>
                {friend.balance.length != 0 ? (
                    friend.balance[0].amount < 0 ? (
                        <View className="flex flex-col items-center">
                            <Text className="text-base text-orange-500">you owe</Text>
                            <Text className="text-base text-orange-500">₹{Math.abs(friend.balance[0].amount)}</Text>
                        </View>
                    ) : (
                        <View className="flex flex-col items-center">
                            <Text className="text-base text-green-400">you owe</Text>
                            <Text className="text-base text-green-400">₹{Math.abs(friend.balance[0].amount).toFixed(2)}</Text>
                        </View>
                    )
                ) : (
                    <Text className="text-sm text-white">no expense</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default FriendCard;