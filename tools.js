import * as SecureStore from "expo-secure-store";
import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URI,
  REACT_APP_GRANT_TYPE,
} from "@env";

export async function setValueFor(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key) {
  return JSON.parse(await SecureStore.getItemAsync(key));
}

export async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

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
    const res = await fetch("https://api.intra.42.fr/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });
    const data = await res.json();
    await setValueFor("access_token", data);
  } catch (error) {}
}

export async function getUserInfo(login) {
  try {
    if (login === "") return;
    const token = await getValueFor("access_token");
    const response = await fetch(
      `https://api.intra.42.fr/v2/users/${login.toLowerCase()}`,
      {
        headers: {
          authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    const data = await response.json();
    if (data && Object.keys(data).length !== 0) {
      return data;
    }
    return undefined;
  } catch (error) {
    throw new Error("Token expired");
  }
}
