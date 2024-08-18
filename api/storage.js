import * as SecureStore from "expo-secure-store";

export async function setValueFor(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key) {
  return JSON.parse(await SecureStore.getItemAsync(key));
}

export async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

export function isTokenExpired(createdAt, expiresIn) {
  const currentTime = parseInt(Date.now() / 1000);
  const expirationTime = parseInt(createdAt) + parseInt(expiresIn);
  return currentTime > expirationTime;
}
