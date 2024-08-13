import React from "react";
import { View, Button, Image } from "react-native";
import { WebView } from "react-native-webview";
import Card from "./../components/card";
import { getTokens } from "./../tools";
import { useAuthContext, authUrl } from "../context/auth.context";
import { REACT_APP_REDIRECT_URI } from "@env";

const OAuthScreen = ({ navigation }) => {
  const { setAuthorized } = useAuthContext();
  const [login, setLogin] = React.useState(false);
  const ref = React.useRef(false);

  const handleRedirect = (url) => {
    if (url.startsWith(REACT_APP_REDIRECT_URI)) {
      const code = url.match(/\?code=([^&]+)/)[1];
      handleAuthorizationCode(code);
    }
  };

  const handleAuthorizationCode = async (code) => {
    if ((!code && ref.current) || ref.current) return;
    ref.current = true;
    await getTokens(code);
    navigation.navigate("Details");
    setAuthorized(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {!login ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              alignSelf: "center",
              width: "80%",
              height: "60%",
              justifyContent: "center",
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
            <Button
              title="Login"
              onPress={() => {
                setLogin(true);
              }}
            />
          </Card>
        </View>
      ) : (
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={(nav) => {
            handleRedirect(nav?.url || "");
          }}
        />
      )}
    </View>
  );
};

export default OAuthScreen;
