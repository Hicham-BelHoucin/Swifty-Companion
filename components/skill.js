import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const Skill = ({ skill }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: "#0961F5",
        }}
      >
        {skill.name}
      </Text>
      <Text
        style={{
          color: "#696969",
        }}
      >
        {skill.level.toFixed(2)}
      </Text>
    </View>
  );
};

export default Skill;
