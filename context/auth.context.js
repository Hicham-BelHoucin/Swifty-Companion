import React, { createContext, useContext, useState } from "react";
import { getValueFor, setValueFor } from "../api/storage";
import { refreshToken, getUserInfo, get_token_info } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } from "@env";

// Create the context
const AuthContext = createContext();

export const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REACT_APP_REDIRECT_URI
)}&response_type=code`;

// Create a custom hook to access the context
export function useAuthContext() {
  return useContext(AuthContext);
}

function isTokenExpired(createdAt, expiresIn) {
  const currentTime = parseInt(Date.now() / 1000);
  const expirationTime = parseInt(createdAt) + parseInt(expiresIn);
  return currentTime > expirationTime;
}

// Create a provider component
export function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const check = async () => {
      try {
        const token = await get_token_info();
        if (token) {
          const isExpired = isTokenExpired(token.created_at, token.expires_in);
          if (isExpired) {
            await refreshToken();
          }
          const user = await getUserInfo("hbel-hou");
          if (user) {
            setAuthorized(true);
            navigation.navigate("Details");
          }
        } else {
          setAuthorized(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        navigation.navigate("Login");
        setAuthorized(false);
      }
    };
    check();
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
