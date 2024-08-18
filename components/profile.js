import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Selector from "./../components/selector";
import ProgressBar from "./../components/progress-bar";
import Info from "./../components/Info";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Project from "./../components/project";
import Skill from "./../components/skill";
import { get_user_coalition } from "../api/api";
import { LinearGradient } from "expo-linear-gradient";

function Profile({ user }) {
  const [state, setState] = React.useState(0);
  const [selected, setSelected] = React.useState(0);
  const [coalition, setCoalition] = React.useState({
    cover_url:
      "https://auth.42.fr/auth/resources/yyzrk/login/students/img/bkgrnd.jpg",
  });
  const [labels, setLabels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // write user to a file
  React.useEffect(() => {
    (async () => {
      const labels = user.cursus_users.map((cursus) => {
        return {
          id: cursus.cursus.id,
          name: cursus.cursus.name,
        };
      });
      setLabels(labels);
      const data = await get_user_coalition(user.login);
      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }
      setCoalition(data[0]);
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        gap: 2,
        ...styles.card,
      }}
    >
      <ImageBackground
        source={{
          uri: coalition.cover_url || "https://i.imgur.com/2zYf8ZB.jpg",
        }}
        style={{
          ...styles.image,
          color: "white",
          gap: 4,
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "#00000070"]}
          style={styles.background}
        />
        <Image
          source={{
            uri:
              user.image.link ||
              "https://auth.42.fr/auth/resources/yyzrk/login/students/img/bkgrnd.jpg",
          }}
          style={{
            alignSelf: "center",
            width: 120,
            height: 120,
            borderRadius: 9999,
          }}
        />
        <Text
          style={{
            ...styles.title,
            color: "#e6e6e6",
          }}
        >
          {user.displayname}
        </Text>
        <Text
          style={{
            ...styles.login,
            color: "#cccccc",
          }}
        >
          {user.login}
        </Text>
        <Info coalition={coalition} title="Wallet" value={user.wallet + " ₳"} />
        <Info
          coalition={coalition}
          title="Evaluation points"
          value={user.correction_point}
        />

        <Info
          coalition={coalition}
          title="Grade"
          value={user.cursus_users[state]?.grade || "Unavailable"}
        />

        <Info
          coalition={coalition}
          title={
            <MaterialCommunityIcons name="email" size={20} color={"#fff"} />
          }
          value={user.email}
        />
        <Info
          coalition={coalition}
          title={<Ionicons name="location" size={20} color={"#fff"} />}
          value={user.location || "Unavailable"}
        />
        <ProgressBar
          coalition={coalition}
          level={user.cursus_users[state]?.level}
        />
      </ImageBackground>
      <View style={styles.divider}></View>

      <Selector
        selectable={true}
        state={state}
        setState={setState}
        labels={labels}
      />
      <View
        style={{
          gap: 4,
          paddingVertical: 8,
        }}
      >
        <Selector
          selectable={true}
          state={selected}
          setState={setSelected}
          labels={[
            { id: 0, name: "Skills" },
            { id: 1, name: "Projects" },
          ]}
        />
        {selected === 0
          ? user.cursus_users[state]?.skills.map((skill) => {
              return <Skill skill={skill} key={skill.id} />;
            })
          : user.projects_users
              .filter((project) => {
                return project.cursus_ids.includes(labels[state].id);
              })
              .map((project) => {
                return <Project project={project} key={project.id} />;
              })}
      </View>
    </ScrollView>
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
  image: {
    resizeMode: "cover",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "110%",
  },
  logo: {},
  title: {
    fontSize: 24,
    textAlign: "center",
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
  card: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default Profile;
