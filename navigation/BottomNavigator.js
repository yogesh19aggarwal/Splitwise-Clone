import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, Image } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useGroupContext } from '../context/GlobalContext';
import { useNavigation } from '@react-navigation/native';

import GroupScreen from '../screens/GroupScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AccountScreen from '../screens/AccountScreen';
import ActivityScreen from '../screens/ActivityScreen';
import GroupInfo from '../components/group/GroupInfo';
import AddGroup from '../components/group/AddGroup';
import FriendInfo from '../components/friends/FriendInfo';
import EditAccount from '../components/account/EditAccount';
import GroupSetting from '../components/group/GroupSetting';
import FriendSetting from '../components/friends/FriendSetting';
import AddExpense from '../components/group/AddExpense';
import * as Linking from 'expo-linking';
import { useDynamicTranslations } from '../locals/i18';
import * as Notifications from 'expo-notifications';

const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Main: {
                screens: {
                    Friends: {
                        screens: {
                            FriendsScreen: 'friends',
                        },
                    },
                    Groups: {
                        screens: {
                            GroupScreen: 'groups',
                            GroupInfo: 'GroupInfo/:id',
                        },
                    },
                },
            },
        },
    },
};


const GroupStack = createNativeStackNavigator();

const GroupStackScreens = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("Groups", {
            screen: "AddGroup",
        });
    };

    return (
        <GroupStack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
            }}>
            <GroupStack.Screen
                name="GroupScreen"
                component={GroupScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#222222",
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                            <AntDesign name="search1" size={20} color="white" />
                            <AntDesign name="addusergroup" onPress={handlePress} size={20} color="white" />
                        </View>
                    ),
                }}
            />
            <GroupStack.Screen
                name="GroupInfo"
                component={GroupInfo}
                options={{
                    headerShown: false,
                }}
            />
            <GroupStack.Screen
                name="AddGroup"
                component={AddGroup}
                options={{
                    headerShown: false,
                }}
            />
            <GroupStack.Screen
                name="GroupSetting"
                component={GroupSetting}
                options={{
                    headerShown: false,
                }}
            />
            <GroupStack.Screen
                name="AddExpense"
                component={AddExpense}
                options={{
                    headerShown: false,
                }}
            />
        </GroupStack.Navigator>
    );
};

const FriendsStack = createNativeStackNavigator();

const FriendsStackScreens = () => {
    return (
        <FriendsStack.Navigator
            initialRouteName="FriendsScreen"
            screenOptions={{
                animation: 'slide_from_right',
            }}>
            <FriendsStack.Screen
                name="FriendsScreen"
                component={FriendsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#222222",
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                            <AntDesign name="search1" size={20} color="white" />
                            <AntDesign name="adduser" size={20} color="white" />
                        </View>
                    ),
                }}
            />
            <FriendsStack.Screen
                name="FriendInfo"
                component={FriendInfo}
                options={{
                    headerShown: false,
                }}
            />
            <FriendsStack.Screen
                name="FriendSetting"
                component={FriendSetting}
                options={{
                    headerShown: false,
                }}
            />
        </FriendsStack.Navigator>
    );
};

const AccountStack = createNativeStackNavigator();

const AccountStackScreens = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                animation: 'slide_from_left',
            }}>
            <AccountStack.Screen
                name='AccountScreen'
                component={AccountScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#222222",
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                            <AntDesign name="search1" size={20} color="white" />
                        </View>
                    ),
                }}
            />
            <AccountStack.Screen
                name='AccountSetting'
                component={EditAccount}
            />
        </AccountStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const i18n = useDynamicTranslations();
    const { user } = useGroupContext();
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#222222",
                    },
                }}
            >
                <Tab.Screen
                    name="Groups"
                    component={GroupStackScreens}
                    options={{
                        tabBarLabel: `${i18n.t("group")}`,
                        headerShown: false,
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FontAwesome6 name="user-group" size={15} color="green" />
                            ) : (
                                <FontAwesome6 name="user-group" size={15} color="white" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsStackScreens}
                    options={{
                        tabBarLabel: `${i18n.t("friend")}`,
                        headerShown: false,
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FontAwesome5 name="user" size={18} color="green" />
                            ) : (
                                <FontAwesome5 name="user" size={18} color="white" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Activity"
                    component={ActivityScreen}
                    options={{
                        tabBarLabel: `${i18n.t("activity")}`,
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#222222",
                        },
                        headerRight: () => (
                            <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                                <AntDesign name="search1" size={20} color="white" />
                            </View>
                        ),
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Feather name="activity" size={20} color="green" />
                            ) : (
                                <Feather name="activity" size={20} color="white" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountStackScreens}
                    options={{
                        tabBarLabel: `${i18n.t("account")}`,
                        headerShown: false,
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Image source={{ uri: user?.picture?.small }} className="w-8 h-8 rounded-full border-2 border-green-800" />
                            ) : (
                                <Image source={{ uri: user?.picture?.small }} className="w-8 h-8 rounded-full" />
                            ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

const Stack = createNativeStackNavigator();

export default function Navigation() {

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url;
            if (url) {
                Linking.openURL(url);
            }
        });

        return () => subscription.remove();
    }, []);

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>

            <StatusBar
                barStyle='light-content'
                backgroundColor='#222222'
            />
        </NavigationContainer>
    );
};
