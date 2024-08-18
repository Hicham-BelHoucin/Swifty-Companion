import React from "react";
import {
  View,
  Button,
  Image,
  ImageBackground,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Card from "./../components/card";
import { getTokens } from "../api/api";
import { useAuthContext, authUrl } from "../context/auth.context";
import { REACT_APP_REDIRECT_URI } from "@env";
import Toast from "react-native-toast-message";

const OAuthScreen = ({ navigation }) => {
  const { setAuthorized, authorized, loading } = useAuthContext();
  const [login, setLogin] = React.useState(false);
  const ref = React.useRef(false);

  const handleRedirect = (url) => {
    if (url.startsWith(REACT_APP_REDIRECT_URI)) {
      const error = url.match(/\?error=([^&]+)/)
        ? url.match(/\?error=([^&]+)/)[1]
        : null;
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please Authorize the app",
        });
        setLogin(false);
        return;
      }
      const code = url.match(/\?code=([^&]+)/)
        ? url.match(/\?code=([^&]+)/)[1]
        : null;
      code !== null && handleAuthorizationCode(code);
    }
  };

  const handleAuthorizationCode = async (code) => {
    if ((!code && ref.current) || ref.current) return;
    ref.current = true;
    await getTokens(code);
    navigation.navigate("Search");
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "You are now logged in",
    });
    setAuthorized(true);
  };

  React.useEffect(() => {
    setLogin(authorized);
    ref.current = authorized;
  }, [authorized]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!login ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageBackground
            source={{
              uri: "https://auth.42.fr/auth/resources/yyzrk/login/students/img/bkgrnd.jpg",
            }}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Toast />
            <Card
              style={{
                alignSelf: "center",
                width: "80%",
                height: "60%",
                justifyContent: "center",
                backgroundColor: "transparent",
                // remove shadow
                shadowColor: "transparent",
                elevation: 0,
              }}
            >
              <Image
                source={require("./../assets/logo.png")}
                alt="test"
                style={{
                  alignSelf: "center",
                  width: 100,
                  height: 100,
                }}
              />
              <Pressable
                onPress={() => {
                  setLogin(true);
                }}
                style={{
                  backgroundColor: "#00babc",
                  color: "white",
                  borderRadius: 10,
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    padding: 10,
                    fontWeight: "bold",
                  }}
                >
                  Login with 42
                </Text>
              </Pressable>
            </Card>
          </ImageBackground>
        </View>
      ) : (
        <WebView
          source={{ uri: authUrl }}
          incognito={true}
          onNavigationStateChange={(nav) => {
            handleRedirect(nav?.url || "");
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});

export default OAuthScreen;
