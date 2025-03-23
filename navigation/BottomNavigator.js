import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useGroupContext } from '../context/GlobalContext';

import GroupScreen from '../screens/GroupScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AccountScreen from '../screens/AccountScreen';
import ActivityScreen from '../screens/ActivityScreen';
import GroupInfo from '../components/group/GroupInfo';

const GroupStack = createNativeStackNavigator();

const GroupStackScreens = () => {

    return (
        <GroupStack.Navigator>
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
                            <AntDesign name="addusergroup" size={20} color="white" />
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
        </GroupStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const {user} = useGroupContext();
    console.log('user',user?.picture?.small);
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
                        tabBarLabel: "Groups",
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
                    component={FriendsScreen}
                    options={{
                        tabBarLabel: "Friends",
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
                    component={AccountScreen}
                    options={{
                        tabBarLabel: "Account",
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
                                <Image source={{uri: user?.picture?.small}} className="w-8 h-8 rounded-full border-2 border-green-800"/>
                            ) : (
                                <Image source={{uri: user?.picture?.small}} className="w-8 h-8 rounded-full"/>
                            ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>

            <StatusBar style="auto" />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 65,
        right: 10,
        backgroundColor: '#0E9587',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 18,
    },
});