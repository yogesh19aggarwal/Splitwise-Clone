import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { useDynamicTranslations } from '../locals/i18';

const FilterMenu = ({ isVisible, onClose, type = 'groups', selectedFilter, onFilterChange }) => {
  const i18n = useDynamicTranslations();
  
  const options = type === 'groups'
    ? [
      { id: 'all', label: `${i18n.t("all_groups")}` },
      { id: 'outstanding', label: `${i18n.t("outstanding_balances")}` },
      { id: 'owe', label: `${i18n.t("groups_you_owe")}` },
      { id: 'owed', label: `${i18n.t("groups_that_owe_you")}` }
    ]
    : [
      { id: 'all', label: `${i18n.t("all_friends")}` },
      { id: 'outstanding', label: `${i18n.t("outstanding_balances")}` },
      { id: 'owe', label: `${i18n.t("friends_you_owe")}` },
      { id: 'owed', label: `${i18n.t("friends_who_owe_you")}` }
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
              className={`px-4 py-3 ${selectedFilter === option.id ? 'bg-[#3d3d3d]' : ''}`}
              onPress={() => {
                onFilterChange(option.id);
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