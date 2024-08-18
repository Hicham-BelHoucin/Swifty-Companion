import React, { createContext, useContext, useState } from "react";
import { getValueFor, setValueFor, isTokenExpired } from "../api/storage";
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

// Create a provider component
export function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
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
            navigation.navigate("Search");
          }
        } else {
          setAuthorized(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        navigation.navigate("Login");
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  // write test use effect to change value of token to test expiration case

  return (
    <AuthContext.Provider
      value={{ authorized, setAuthorized, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
