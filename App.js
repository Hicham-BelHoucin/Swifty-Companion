import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider, useAuthContext } from "./context/auth.context";
import HomeScreen from "./veiws/login";
import DetailsScreen from "./veiws/profile";
import { ActivityIndicator } from "react-native";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { getUserInfo, get_token_info, refreshToken } from "./api/api";
import Card from "./components/card";
import Toast from "react-native-toast-message";
import {
  deleteValueFor,
  setValueFor,
  getValueFor,
  isTokenExpired,
} from "./api/storage";

const Stack = createStackNavigator();

/*

<TouchableOpacity
            style={{
              marginRight: 30,
            }}
          >
            <Icon
              name="logout"
              size={25}
              color={"#0961F5"}
              onPress={async () => {
                await deleteValueFor("access_token");
                navigation.navigate("Login");
                setAuthorized(false);
              }}
            />
          </TouchableOpacity>
*/

const Search = ({ navigation }) => {
  const { setAuthorized } = useAuthContext();
  const [value, onChangeText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // remove back button from the header bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const logout = async () => {
    navigation.navigate("Login");
    deleteValueFor("access_token");
    setAuthorized(false);
  };

  const search = async () => {
    try {
      setLoading(true);
      const data = await getUserInfo(value);
      navigation.navigate("Details", {
        data: data,
      });
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        await logout();
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Card
        style={{
          width: "80%",
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          source={require("./assets/logo.png")}
          alt="test"
          style={{
            alignSelf: "center",
            width: 100,
            height: 100,
          }}
        />
        <Text style={styles.title}>Search Users</Text>
        <TextInput
          autoCorrect={false}
          editable
          numberOfLines={4}
          autoCapitalize="none"
          maxLength={40}
          onChangeText={(text) => onChangeText(text)}
          placeholder="Enter a login "
          value={value}
          style={{ padding: 10, width: "100%" }}
        />
        <TouchableOpacity
          onPress={search}
          style={{
            backgroundColor: "#00babc",
            color: "white",
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 10,
          }}
          disabled={loading || !value}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Search
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={logout}
          style={{
            backgroundColor: "#00babc",
            color: "white",
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={HomeScreen} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
export default App;
