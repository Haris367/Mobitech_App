// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StackNavigator from "./app/navigation/StackNavigator";
import { useEffect, useState } from "react";
import SplashScreen from "./app/screens/SplashScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isShowSplash, setIsShowSplach] = useState(true);
  useEffect(() => {
    setTimeout(() => {
    setIsShowSplach(false);
    }, 3000);
  });
  return (
    
      <NavigationContainer>
      {isShowSplash ? <SplashScreen/> : <StackNavigator/>}
        {/* <StackNavigator /> */}
      </NavigationContainer>
    
  );
}
