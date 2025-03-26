import "./global.css";
import { registerRootComponent } from "expo";
import Navigator from "./navigation/BottomNavigator";
import { LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import store from './features/store';
import { Provider } from 'react-redux';
enableScreens();

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

export function App() {

  return (
    <Provider store={store}>
        <Navigator />
    </Provider>
  );
}

registerRootComponent(App);