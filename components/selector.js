import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Selector = ({ state, setState, labels }) => {
  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              backgroundColor: index === state ? "#0961F5" : "#f2f2f2",
            },
          ]}
          onPress={() => setState(index)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: index === state ? "#f2f2f2" : "#000",
              },
            ]}
          >
            {label.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 4,
    gap: 4,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    backgroundColor: "#0961F5",
    borderRadius: 4,
    color: "white",
  },
});

export default Selector;
