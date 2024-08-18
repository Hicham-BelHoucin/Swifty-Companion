import { StyleSheet, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import Profile from "./../components/profile";

function HomePage({ navigation, route }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Toast />
      <Profile user={data} />
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
