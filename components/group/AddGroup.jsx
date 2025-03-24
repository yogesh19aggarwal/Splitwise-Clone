import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { addGroup } from '../../services/postApi';
import { useNavigation } from '@react-navigation/native';

const AddGroup = () => {
    const navigation = useNavigation();
    const [groupName, setGroupName] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    const groupTypes = [
        { id: '1', label: 'Trip', icon: 'airplane' },
        { id: '2', label: 'Home', icon: 'home' },
        { id: '3', label: 'Couple', icon: 'heart' },
        { id: '4', label: 'Other', icon: 'ellipsis1' },
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const handleAddGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('Error', 'Group name is required!');
            return;
        }

        const groupData = {
            name: groupName,
            type: selectedType || null, 
        };

        try {
            const response = await addGroup(groupData);
            Alert.alert('Success', 'Group added successfully!');
            setGroupName('');
            setSelectedType(null);
            navigation.goBack();
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to add group. Please try again.');
        }
    };

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-[#222222] p-4">

            <View className="flex-row justify-between items-center mb-5">
                <AntDesign name="close" onPress={handlePress} size={24} color="white" />
                <Text className="text-white text-lg font-bold">Create a group</Text>
                <TouchableOpacity onPress={handleAddGroup}>
                    <Text className="text-green-500 text-base">Done</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-5">
                <TouchableOpacity className="w-12 h-12 bg-gray-800 rounded-full justify-center items-center mr-3">
                    <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
                <TextInput
                    className="flex-1 border-b border-gray-600 text-white text-base pb-1"
                    placeholder="Group name"
                    placeholderTextColor="#888"
                    value={groupName}
                    onChangeText={setGroupName}
                />
            </View>

            <Text className="text-white text-base mb-3">Type</Text>
            <View>


                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {groupTypes.map((type) => (
                        <TouchableOpacity
                            key={type.id}
                            className={`flex-row items-center py-2 w-36 justify-center rounded-full mr-3 ${selectedType === type.label ? 'bg-teal-600' : 'bg-gray-800'
                                }`}
                            onPress={() => handleTypeSelect(type.label)}
                        >
                            <AntDesign
                                name={type.icon}
                                size={16}
                                color={selectedType === type.label ? 'white' : 'gray'}
                            />
                            <Text
                                className={`ml-2 text-base ${selectedType === type.label ? 'text-white' : 'text-gray-400'
                                    }`}
                            >
                                {type.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default AddGroup;