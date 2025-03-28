import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useGroupContext } from '../context/GlobalContext';
import { Ionicons, MaterialIcons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { getUser } from '../services/getApi';
import { useNavigation } from '@react-navigation/native';
import i18n from '../locals/i18';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, error, loading, setError, setUser, setLang } = useGroupContext();

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLang(lang);
  };

  const handleEdit = () => {
    navigation.navigate('AccountSetting', { id: user.id });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  const getData = async () => {
    try {
      const res = await getUser();
      setUser(res.user);
    } catch (error) {
      setError(error);
    }
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#222222] justify-center items-center">
        <ActivityIndicator size="large" color="#5bc5a7" />
      </SafeAreaView>
    );
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#222222] justify-center items-center">
        <Text className="text-white text-lg">Error loading profile: {error.message}</Text>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#222222]">

      <ScrollView refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
        <Text className="text-2xl text-white ml-6">{i18n.t("account")}</Text>

        <View className="pt-4 pb-6 px-6 border-b border-gray-700">
          <View className="flex-row items-center">
            <View className="mr-4">
              {user?.picture ? (
                <Image
                  source={{ uri: user.picture.medium }}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <View className="w-20 h-20 rounded-full bg-gray-600 justify-center items-center">
                  <Text className="text-white text-3xl">{user?.first_name?.charAt(0)}</Text>
                </View>
              )}
              <TouchableOpacity className="absolute bottom-0 right-0 bg-[#5bc5a7] rounded-full p-1">
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-white text-2xl font-semibold">{user?.first_name || 'User'}</Text>
              <Text className="text-gray-400">{user?.email || 'No email'}</Text>
            </View>
            <Feather name="edit-2" className="ml-10" onPress={handleEdit} size={24} color="white" />
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <AntDesign name="qrcode" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("scan_code")}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <FontAwesome name="diamond" size={24} color="#a461e5" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("splitwise_pro")}</Text>
          </View>
        </TouchableOpacity>

        <View className="mt-6 px-6 mb-2">
          <Text className="text-white text-sm">{i18n.t("preferences")}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <MaterialIcons name="email" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("email_setting")}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <Ionicons name="notifications" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("device_push")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 " onPress={() => setModalVisible(true)}>
          <Ionicons name="notifications" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("language")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 ">
          <Feather name="lock" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("security")}</Text>
          </View>

        </TouchableOpacity>

        <View className="mt-6 px-6 mb-2">
          <Text className="text-white text-sm">{i18n.t("feedback")}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center px-6 py-4  ">
          <AntDesign name="star" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("rate_splitwise")}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-700">
          <AntDesign name="questioncircle" size={24} color="white" className="mr-4" />
          <View className="flex-1">
            <Text className="text-white text-lg">{i18n.t("contact_support")}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center px-6 py-4 mt-6  ">
          <AntDesign name="logout" size={24} color="#5bc5a7" className="mr-4" />
          <View className="flex-1">
            <Text className="text-[#5bc5a7] text-lg">{i18n.t("logout")}</Text>
          </View>
        </TouchableOpacity>

        <View className="py-6 px-4 items-center">
          <Text className="text-gray-500 text-center">
            {i18n.t("made_in")}
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            {i18n.t("copyright")}
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            {i18n.t("ps_bunny")}
          </Text>
          <TouchableOpacity className="mt-4">
            <Text className="text-[#5bc5a7] text-center">
              {i18n.t("privacy_policy")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-3/4 p-4">
            <TouchableOpacity onPress={() => { changeLanguage("en"); setModalVisible(false); }} className="p-4">
              <Text className="text-lg">English </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { changeLanguage("hi"); setModalVisible(false); }} className="p-4">
              <Text className="text-lg">हिन्दी</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { changeLanguage("de"); setModalVisible(false); }} className="p-4">
              <Text className="text-lg">Deutsch </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} className="p-4">
              <Text className="text-red-500 text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AccountScreen;
