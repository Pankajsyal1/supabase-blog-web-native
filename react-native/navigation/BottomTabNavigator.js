import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Create Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HOME_SCREEN") iconName = "home-outline";
          else if (route.name === "COMMUNITIES_SCREEN") iconName = "people-outline";
          else if (route.name === "PROFILE_SCREEN") iconName = "person-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Hides top header inside the TabNavigator
      })}
    >
      <Tab.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Tab.Screen name="COMMUNITIES_SCREEN" component={CommunitiesScreen} />
      <Tab.Screen name="PROFILE_SCREEN" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
