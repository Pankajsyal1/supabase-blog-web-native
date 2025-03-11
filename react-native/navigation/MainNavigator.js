import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import CommunitiesScreen from '../screens/CommunitiesScreen';
import AddCommunityScreen from '../screens/AddCommunityScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{
        headerRight: () => <Button title='+' onPress={() => navigation.navigate("postCreate")} />
      }} />
      <Stack.Screen name='postDetail' component={PostDetailScreen} />
      <Stack.Screen name='postCreate' component={CreatePostScreen} />
      <Stack.Screen name='communities' component={CommunitiesScreen} />
      <Stack.Screen name='createCommunity' component={AddCommunityScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator