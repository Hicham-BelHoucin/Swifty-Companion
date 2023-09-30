import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const Project = ({ project }) => {
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
        {project.project.name}
      </Text>
      <Text
        style={{
          color: project["validated?"] ? "green" : "red",
        }}
      >
        {project.final_mark}{" "}
        {project.status === "finished"
          ? project["validated?"] === true
            ? "✅"
            : "❌"
          : "⏳"}
      </Text>
    </View>
  );
};

export default Project;
