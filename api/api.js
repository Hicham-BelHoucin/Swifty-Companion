import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URI,
  REACT_APP_GRANT_TYPE,
} from "@env";
import axios from "axios";
import { getValueFor, setValueFor, isTokenExpired } from "./storage";
import Toast from "react-native-toast-message";
// create a new axios instance
const api = axios.create({
  baseURL: "https://api.intra.42.fr/v2",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await getValueFor("access_token");
    config.headers.Authorization = `Bearer ${token.access_token}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
      const token = await getValueFor("access_token");
      const isExpired = isTokenExpired(token.created_at, token.expires_in);
      if (isExpired) {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: "Looks like your token is expired, trying to refresh it",
        });
        try {
          await refreshToken();
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Token refreshed successfully",
          });
          // retry the request
          return api.request(error.config);
        } catch (error) {}
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Oops! looks like your access token is invalid or expired",
      });
      return Promise.reject(error);

      //   setValueFor("access_token", null);
    } else if (error.response.status === 404) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not found or does not exist",
      });
    } else if (error.response.status === 500) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Internal server error",
      });
    } else if (
      error.message === "Network Error" ||
      error.message === "timeout of 5000ms exceeded"
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error",
      });
    }
    return Promise.reject(error);
  }
);

// Function to retrieve OAuth tokens
export async function getTokens(code) {
  const details = {
    grant_type: REACT_APP_GRANT_TYPE,
    code: code,
    redirect_uri: REACT_APP_REDIRECT_URI,
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
  };

  const formBody = Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
    )
    .join("&");

  try {
    const { data } = await axios.post(
      "https://api.intra.42.fr/oauth/token",
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    await setValueFor("access_token", data);
  } catch (error) {}
}

// Function to refresh the OAuth token
export async function refreshToken() {
  const token = await getValueFor("access_token");

  const details = {
    grant_type: "refresh_token",
    refresh_token: token.refresh_token,
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
  };

  const formBody = Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
    )
    .join("&");

  try {
    const { data } = await axios.post(
      "https://api.intra.42.fr/oauth/token",
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    await setValueFor("access_token", data);
  } catch (error) {
    throw new Error("Error refreshing token");
  }
}

// Function to fetch user info based on login
export async function getUserInfo(login) {
  try {
    if (!login) return;
    const response = await api.get(`/users/${login}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function get_user_coalition(login) {
  try {
    const response = await api.get(`/users/${login}/coalitions`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user coalition");
  }
}

export async function get_token_info() {
  try {
    const response = await api.get("/oauth/token/info");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching token info");
  }
}

// export the api instance
export default api;
