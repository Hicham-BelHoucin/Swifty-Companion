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
