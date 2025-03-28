import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import i18n from '../../locals/i18';

const GroupToggleSection = ({ showInactiveGroups, setShowInactiveGroups, inactiveGroupsCount }) => {
  return (
    <View className="px-4 my-6">
      {showInactiveGroups ? (
        <View>
          <Text className="text-white text-lg text-center">
            {i18n.t("previously_settled_groups")} <Text className="text-teal-400" onPress={() => setShowInactiveGroups(false)}>{i18n.t("re_hide")}</Text>
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-white text-base text-center mb-4">
            {i18n.t("hiding_groups")}
          </Text>
          <TouchableOpacity 
            onPress={() => setShowInactiveGroups(true)}
            className="border border-teal-200 py-2 px-4"
          >
            <Text className="text-teal-200 text-lg">
              {i18n.t("show")} {inactiveGroupsCount} {i18n.t("settled_up")} {i18n.t("groups")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroupToggleSection; 