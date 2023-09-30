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
import { getValueFor, deleteValueFor } from "../tools";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Profile from "./../components/profile";

function HomePage({ navigation }) {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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
              }}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  const search = async () => {
    try {
      if (value === "") return;
      const token = await getValueFor("access_token");
      if (!token) return;
      setLoading(true);
      const response = await fetch(
        `https://api.intra.42.fr/v2/users/${value.toLowerCase()}`,
        {
          headers: {
            authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok && data && Object.keys(data).length !== 0) {
        setData(data);
      } else {
        Toast.show({
          type: "error", // 'info', 'success', 'error', or 'warning'
          text1: data.error || "No user found",
          text2: "Please try again",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error", // 'info', 'success', 'error', or 'warning'
        text1: "No user found",
        text2: "Please try again",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Toast />
      </View>
      {!data ? (
        <Card
          style={{
            width: "80%",
            height: "60%",
            justifyContent: "center",
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
          <Text style={styles.title}>Search Users : </Text>
          <TextInput
            editable
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
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
