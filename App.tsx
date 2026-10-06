import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import HomeScreen from "./src/screens/HomeScreen";
import PostsScreen from "./src/screens/PostsScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import LinkingScreen from "./src/screens/LinkingScreen";
import SensorsScreen from "./src/screens/SensorsScreen";
import LocationScreen from "./src/screens/LocationScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Posts" component={PostsScreen} />
          <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
            options={{ title: "Post Details" }}
          />
          <Stack.Screen name="Linking" component={LinkingScreen} />
          <Stack.Screen name="Sensors" component={SensorsScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
