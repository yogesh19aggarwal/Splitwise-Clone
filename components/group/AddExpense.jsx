import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addExpense } from '../../services/postApi';

const AddExpense = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, groupName, groupImage } = route.params;  

    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');

    const handleAddExpense = async () => {
        if (!description || !cost) {
            Alert.alert('Error', 'Please fill out all required fields.');
            return;
        }

        const expenseData = {
            group_id: id,
            description,
            cost,
            split_equally: true,
        };

        try {
            await addExpense(expenseData);
            Alert.alert('Success', 'Expense added successfully.');
            navigation.goBack();
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to add expense. Please try again.');
        }
    };

    return (
        <View className="flex-1 bg-[#1c1c1e] p-4">

            <View className="flex-row justify-between items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-white text-lg">{'< Back'}</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Add Expense</Text>
                <TouchableOpacity onPress={handleAddExpense}>
                    <Text className="text-blue-500 text-lg">✓</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-4">
                {groupImage ? (
                    <Image
                        source={{ uri: groupImage }}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <View className="w-10 h-10 bg-green-500 rounded-full" />
                )}
                <Text className="text-white text-lg ml-4">With you and: All of {groupName}</Text>
            </View>

            <View className="flex-row items-center bg-[#333] p-2 rounded-lg mb-4">
                <TextInput
                    placeholder="Enter a description"
                    placeholderTextColor="#888"
                    value={description}
                    onChangeText={setDescription}
                    className="text-white flex-1"
                />
            </View>

            <View className="flex-row items-center bg-[#333] p-2 rounded-lg mb-4">
                <Text style={{ color: 'white', fontSize: 18 }}>₹ </Text>
                <TextInput
                    placeholder="0.00"
                    placeholderTextColor="#888"
                    value={cost}
                    onChangeText={setCost}
                    keyboardType="numeric"
                    className="text-white flex-1"
                />
            </View>

            <View className="flex-row justify-between items-center mb-4">
                <Text style={{ color: 'white', fontSize: 16 }}>Paid by <Text style={{ fontWeight: 'bold' }}>you</Text> and split <Text style={{ fontWeight: 'bold' }}>equally</Text></Text>
            </View>
        </View>
    );
};

export default AddExpense;
