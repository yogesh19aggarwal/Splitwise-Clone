import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GroupHeader = ({ coverPhoto, id, name, image }) => {
  const navigation = useNavigation();

  const handleSetting = ()=>{
    navigation.navigate('GroupSetting', {id: id, groupName: name, groupImage: image});
  };

  const handleBack = () => {
    navigation.goBack();
  }
  
  return (
    <ImageBackground
      source={{ uri: coverPhoto }}
      className="h-28"
      resizeMode='cover'
    >
      <View className="flex-row justify-between items-center px-4 mt-4">
        <TouchableOpacity >
          <AntDesign name="left" onPress={handleBack} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="settings" onPress={handleSetting} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default GroupHeader; 