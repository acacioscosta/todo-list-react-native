import { MMKV } from 'react-native-mmkv'

import { StorageService } from "./storageService";

const storage = new MMKV()

export const mmkvStorage: StorageService = {
  getAllKeys: async () => {
    const value = storage.getAllKeys()

    return value ? value : null
  },

  getItem: async (key) => {
    const value = storage.getString(key)

    return value ? JSON.parse(value) : null
  },

  setItem: async (key, value) => {
    storage.set(key, JSON.stringify(value))
  },

  removeItem: async (key) => {
    storage.delete(key)
  },

  clearStorage: async () => {
    storage.clearAll()
  },
}