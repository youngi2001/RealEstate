import "react-native-gesture-handler";
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native'
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import icons from "./constants/icons";

import React from 'react';


//setting global values
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';

//importing screens
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DetailsScreen from "./screens/DetailsScreen";





const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();


const HomeTabs = () => {
  return (
    <Tabs.Navigator screenOptions={{
      swipeEnabled: true,
      headerShown: false,
      tabBarStyle: {
        height: 70,
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        fontFamily: "Rubik-Regular",
        fontSize: 12
      },

    }}>
      <Tabs.Screen name="Home" component={HomeScreen} options={{

        tabBarIcon: ({ focused }) => (<Image source={icons.home} style={{ width: 25, height: 25, tintColor: focused ? "#0061FF" : "#666876" }} />)
      }} />
      <Tabs.Screen name="Explore" component={ExploreScreen} options={{

        tabBarIcon: ({ focused }) => (<Image source={icons.search} style={{ width: 25, height: 25, tintColor: focused ? "#0061FF" : "#666876" }} />)

      }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (<Image source={icons.person} style={{ width: 25, height: 25, tintColor: focused ? "#0061FF" : "#666876" }} />)
      }} />
    </Tabs.Navigator>
  );
}


const TabAuth = () => {
  return (
    <TopTabs.Navigator screenOptions={{
      tabBarStyle: { display: "none" },
      swipeEnabled: true,
      animationEnabled: false,
    }}>
      <TopTabs.Screen name="Login" component={LoginScreen} />
      <TopTabs.Screen name="Signup" component={SignupScreen} />
    </TopTabs.Navigator>
  )
}


const Stacks = () => {
  const { isLoggedIn, } = useGlobalContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        isLoggedIn ?
          (
            <>
              <Stack.Screen name="Tabs" component={HomeTabs} />
              <Stack.Screen name="Details" component={DetailsScreen} />
            </>
          )
          :
          (
            <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="AuthStack" component={TabAuth} />
            </>
          )
      }
    </Stack.Navigator>
  );
}


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/Rubik/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik/Rubik-SemiBold.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik/Rubik-Light.ttf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </GlobalProvider>
  );
}
