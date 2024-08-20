import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "./storageService";

export const asyncStorage: StorageService = {
  getAllKeys: async () => {
    const value = await AsyncStorage.getAllKeys()

    return value ? value : null
  },

  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key)

    return value ? JSON.parse(value) : null
  },

  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },

  removeItem: async (key) => {
    await AsyncStorage.removeItem(key)
  },

  clearStorage: async () => {
    await AsyncStorage.clear()
  },
}