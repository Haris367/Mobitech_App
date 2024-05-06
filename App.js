// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import {StackNav} from "./app/navigation/StackNavigator";
import BottomTabNavigation from "./app/navigation/BottomTabNavigation";
import { useEffect, useState } from "react";
import SplashScreen from "./app/screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AdPostScreen,
  HomeScreen,
  Profile,
  RegistrationScreen,
  Sell,
  SigninScreen,
  UserDetails,
  WelcomeScreen,
} from "./app/screens";
import AppNavigation from "./app/navigation/NavigationContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNav from "./app/navigation/BottomTabNavigation";


// const Stack = createNativeStackNavigator();

// // export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isShowSplash, setIsShowSplash] = useState(true);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     const data = await AsyncStorage.getItem("isLoggedIn");
//   //     console.log(data, "at app.js");
//   //     setIsLoggedIn(data);
//   //     setIsShowSplash(false); // Hide splash screen once data is retrieved
//   //   }
//   //   fetchData();
//   // }, 3000);

//   // if (isShowSplash) {
//   //   // Show splash screen while loading data
//   //   return <SplashScreen />;
//   // }

//   // Once data is loaded, show the appropriate navigation based on login status
//   return (
//     // <NavigationContainer>
//     //   {isLoggedIn ? <BottomTabNavigation /> : <StackNav />}
//     // </NavigationContainer>
// <AppNavigation/>
//     // <AdPostScreen/>
//   );
// }

const Stack = createNativeStackNavigator();
export const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WelcomeScreen" component={LogNav} />
      {/* <Stack.Screen name="Sell" component={TabNav}/> */}
      {/* <Stack.Screen name="Details" component={TabNav}/> */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Sell Your Phone" component={AdPostScreen} />
    </Stack.Navigator>
  );
};
export const LogNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Home" component={TabNav} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data, "at app.js");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   getData();
  //   setTimeout(() => {
  //     setIsShowSplash(false);
  //   }, 2000);
  // });
  return (
    <NavigationContainer>

      {isLoggedIn ? <TabNav /> : <LogNav />}
      {/* <Toast/> */}
      {/* {isShowSplash ? <SplashScreen /> : <StackNav />} */}
    </NavigationContainer>
  );
}
