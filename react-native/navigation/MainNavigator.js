import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import AddCommunityScreen from "../screens/AddCommunityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOME_SCREEN_NAVIGATOR"
        component={BottomTabNavigator}
        options={{
          headerShown: false, // Hide the top header for bottom navigation
        }}
      />
      <Stack.Screen name="POST_DETAIL_SCREEN" component={PostDetailScreen} />
      <Stack.Screen name="CREATE_POST_SCREEN" component={CreatePostScreen} />
      <Stack.Screen name="COMMUNITIES_SCREEN" component={CommunitiesScreen} />
      <Stack.Screen name="CREATE_COMMUNITY_SCREEN" component={AddCommunityScreen} />
      <Stack.Screen name="PROFILE_SCREEN" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
