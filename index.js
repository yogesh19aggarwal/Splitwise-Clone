import "./global.css";
import { registerRootComponent } from "expo";
import Navigator from "./navigation/BottomNavigator";
import { GroupProvider } from "./context/GlobalContext";
import { LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
// import { usePushNotifications } from './notification/usePushNotifications';

enableScreens();

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

function AppWrapper() {
  // const { expoPushToken, notification } = usePushNotifications();

  return (
    <GroupProvider>
      <Navigator />
    </GroupProvider>
  );
}

export function App() {
  return <AppWrapper />;
}

registerRootComponent(App);