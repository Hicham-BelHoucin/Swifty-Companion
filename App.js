import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./context/auth.context";
import HomeScreen from "./veiws/login";
import DetailsScreen from "./veiws/profile";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App;
