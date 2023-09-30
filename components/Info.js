import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const Info = ({ title, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 4,
        gap: 16,
      }}
    >
      <Text
        style={{
          color: "#0961F5",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#696969",
          fontSize: 16,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default Info;
