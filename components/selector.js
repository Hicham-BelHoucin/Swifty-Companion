import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Selector = ({ selectable, state, setState, first, second }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={state !== 0 ? styles.buttonText : styles.button}
        onPress={() => setState(0)}
        disabled={state === 0 || !selectable}
      >
        <Text
          style={{
            color: state === 0 ? "white" : "#0961F5",
          }}
        >
          {first}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={state !== 1 ? styles.buttonText : styles.button}
        onPress={() => setState(1)}
        disabled={state === 1 || !selectable}
      >
        <Text
          style={{
            color: state === 1 ? "white" : "#0961F5",
          }}
        >
          {second}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    borderRadius: 4,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#0961F5",
    borderRadius: 4,
    color: "white",
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 4,
  },
});

export default Selector;
