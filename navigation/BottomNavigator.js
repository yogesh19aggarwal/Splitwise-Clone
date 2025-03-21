import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from 'react-native';

import GroupScreen from '../screens/GroupScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AccountScreen from '../screens/AccountScreen';
import ActivityScreen from '../screens/ActivityScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#1E1E1E",
                    },
                }}
            >
                <Tab.Screen
                    name="Groups"
                    component={GroupScreen}
                    options={{
                        tabBarLabel: "Groups",
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#1E1E1E",
                        },
                        headerRight: () => (
                            <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                                <AntDesign name="search1" size={20} color="white" />
                                <AntDesign name="addusergroup" size={20} color="white" />
                            </View>
                        ),
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
                    component={FriendsScreen}
                    options={{
                        tabBarLabel: "Friends",
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#1E1E1E",
                        },
                        headerRight: () => (
                            <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                                <AntDesign name="search1" size={20} color="white" />
                                <AntDesign name="adduser" size={20} color="white" />
                            </View>
                        ),
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
                        tabBarLabel: "Activity",
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#1E1E1E",
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
                    component={AccountScreen}
                    options={{
                        tabBarLabel: "Account",
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#1E1E1E",
                        },
                        headerRight: () => (
                            <View style={{ flexDirection: "row", gap: 24, marginRight: 15 }}>
                                <AntDesign name="search1" size={20} color="white" />
                            </View>
                        ),
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FontAwesome6 name="user-group" size={15} color="green" />
                            ) : (
                                <FontAwesome6 name="user-group" size={15} color="white" />
                            ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}