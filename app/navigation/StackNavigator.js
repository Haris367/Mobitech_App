import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from './BottomTabNavigation'
import { Profile, RegistrationScreen, SigninScreen, UserDetails, WelcomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <Stack.Screen name="Register" component={RegistrationScreen}/>
        <Stack.Screen name="Signin" component={SigninScreen}/>
        <Stack.Screen name="Details" component={UserDetails}/>
        <Stack.Screen name="Profile" component={Profile}/>

        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
        //   options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}

export default StackNavigator