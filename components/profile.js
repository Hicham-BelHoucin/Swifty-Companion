import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import React from "react";
import Selector from "./../components/selector";
import Card from "./../components/card";
import ProgressBar from "./../components/progress-bar";
import Info from "./../components/Info";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Project from "./../components/project";
import Skill from "./../components/skill";
import Toast from "react-native-toast-message";
import { getValueFor, deleteValueFor } from "../tools";
import Icon from "react-native-vector-icons/SimpleLineIcons";

function Profile({ user, setUser }) {
  const [state, setState] = React.useState(1);
  const [selected, setSelected] = React.useState(0);
  return (
    <Card
      style={{
        gap: 2,
        height: "90%",
      }}
    >
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
        }}
        onPress={() => {
          setUser(null);
        }}
      >
        <Ionicons name="close" size={25} />
      </TouchableOpacity>
      <Image
        source={{ uri: user.image.link || "" }}
        style={{
          alignSelf: "center",
          width: 120,
          height: 120,
          borderRadius: 9999,
        }}
      />
      <Text style={styles.title}>{user.displayname}</Text>
      <Text style={styles.login}>{user.login}</Text>
      <Info title="Wallet" value={user.wallet + " ₳"} />
      <Info title="Evaluation points" value={user.correction_point} />
      {!!user.cursus_users[state].grade && (
        <Info title="Grade" value={user.cursus_users[state].grade} />
      )}
      <Info
        title={
          <MaterialCommunityIcons name="email" size={20} color={"#0961F5"} />
        }
        value={user.email}
      />
      <Info
        title={<Ionicons name="location" size={20} color={"#0961F5"} />}
        value={user.location || "Unavailable"}
      />
      {user?.phone !== "hidden" && (
        <Info
          title={<Entypo name="phone" size={20} color={"#0961F5"} />}
          value={user.phone}
        />
      )}
      <ProgressBar level={user.cursus_users[state].level} />
      <View style={styles.divider}></View>
      <Selector
        selectable={true}
        state={selected}
        setState={setSelected}
        first="Skills"
        second="Projects"
      />
      <ScrollView>
        {selected === 0
          ? user.cursus_users[state].skills.map((skill) => {
              return <Skill skill={skill} key={skill.id} />;
            })
          : user.projects_users
              .filter((project) => {
                return project.cursus_ids.includes(state === 1 ? 21 : 9);
              })
              .map((project) => {
                return <Project project={project} key={project.id} />;
              })}
      </ScrollView>
      <Selector
        selectable={true}
        state={state}
        setState={setState}
        first="C piscine"
        second="42Cursus"
      />
    </Card>
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
  logo: {},
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
  login: {
    fontSize: 16,
    alignSelf: "center",
    color: "#666",
  },
  divider: {
    height: 1, // Adjust the height of the divider as needed
    backgroundColor: "gray", // Customize the color of the divider
    margin: 4,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
});

export default Profile;
