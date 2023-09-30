import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const ProgressBar = ({ level }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#F5F9FF",
          height: 20,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#0961F5",
            height: "100%",
            width: `${(level % 1) * 100}%`,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            {level}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
