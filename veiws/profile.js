import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Card from "./../components/card";
import Toast from "react-native-toast-message";
import { getValueFor, deleteValueFor } from "../api/storage";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Profile from "./../components/profile";
import { useAuthContext } from "../context/auth.context";
import { getUserInfo } from "../api/api";

function HomePage({ navigation }) {
  const [value, onChangeText] = React.useState("");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { setAuthorized } = useAuthContext();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Search Users",
      headerLeft: () => null, // Set headerLeft to null
      headerRight: () => {
        return (
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
        );
      },
    });
  }, [navigation]);

  const search = async () => {
    try {
      const data = await getUserInfo(value);
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      {!data ? (
        <Card
          style={{
            width: "80%",
            height: "60%",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Image
            source={require("./../assets/logo.png")}
            alt="test"
            style={{
              alignSelf: "center",
              width: 100,
              height: 100,
            }}
          />
          <Text style={styles.title}>Search Users</Text>
          <TextInput
            editable
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Enter a login "
            value={value}
            style={{ padding: 10, width: "100%" }}
          />
          <Button title="Search" onPress={search} disabled={loading} />
        </Card>
      ) : (
        <Profile user={data} setUser={setData} />
      )}
    </View>
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

export default HomePage;
