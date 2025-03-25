import "./global.css";
import { registerRootComponent } from "expo";
import Navigator from "./navigation/BottomNavigator";
import { GroupProvider } from "./context/GlobalContext";
import { LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

export function App() {

  return (
    <GroupProvider>
        <Navigator />
    </GroupProvider>
  );
}

registerRootComponent(App);