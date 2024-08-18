import { Text, View } from "react-native";

const Info = ({ title, value, coalition }) => {
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
          color: "#fff",
          fontWeight: "semibold",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default Info;
