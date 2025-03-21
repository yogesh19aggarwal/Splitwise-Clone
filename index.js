import "./global.css";
import { registerRootComponent } from "expo";
import BottomTabNavigator from "./navigation/BottomNavigator";

export function App() {
  return <BottomTabNavigator />;
}

registerRootComponent(App);