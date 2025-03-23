import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';

const FilterMenu = ({ isVisible, onClose, type = 'groups' }) => {
  const options = type === 'groups' 
    ? [
        { id: 'all', label: 'All groups' },
        { id: 'outstanding', label: 'Outstanding balances' },
        { id: 'owe', label: 'Groups you owe' },
        { id: 'owed', label: 'Groups that owe you' }
      ]
    : [
        { id: 'all', label: 'All friends' },
        { id: 'outstanding', label: 'Outstanding balances' },
        { id: 'owe', label: 'Friends you owe' },
        { id: 'owed', label: 'Friends who owe you' }
      ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={onClose}
      >
        <View className="bg-[#2d2d2d] absolute top-14 right-4 rounded-lg w-64 py-2">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="px-4 py-3"
              onPress={() => {
                // Handle filter selection here
                onClose();
              }}
            >
              <Text className="text-white text-base">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FilterMenu; 