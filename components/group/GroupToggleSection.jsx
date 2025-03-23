import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const GroupToggleSection = ({ showInactiveGroups, setShowInactiveGroups, inactiveGroupsCount }) => {
  return (
    <View className="px-4 my-6">
      {showInactiveGroups ? (
        <View>
          <Text className="text-white text-lg text-center">
            Previously settled groups. <Text className="text-teal-400" onPress={() => setShowInactiveGroups(false)}>Re-hide</Text>
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-white text-base text-center mb-4">
            Hiding groups that have been settled up over one month.
          </Text>
          <TouchableOpacity 
            onPress={() => setShowInactiveGroups(true)}
            className="border border-teal-200 py-2 px-4"
          >
            <Text className="text-teal-200 text-lg">
              Show {inactiveGroupsCount} settled-up groups
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroupToggleSection; 