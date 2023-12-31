import React, { createContext, useContext, useState } from "react";
import { getValueFor, getUserInfo } from "../tools";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } from "@env";

// Create the context
const AuthContext = createContext();

export const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REACT_APP_REDIRECT_URI
)}&response_type=code&scope=public+profile`;

// Create a custom hook to access the context
export function useAuthContext() {
  return useContext(AuthContext);
}

// Create a provider component
export function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const check = async () => {
      try {
        const token = await getValueFor("access_token");
        if (token) {
          const user = await getUserInfo("hbel-hou");
          if (user) {
            setAuthorized(true);
            navigation.navigate("Details");
          }
        }
      } catch (error) {}
    };
    check();
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
