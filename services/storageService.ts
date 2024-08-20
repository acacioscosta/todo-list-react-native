export interface StorageService {
  getAllKeys: () => Promise<readonly string[] | null>
  getItem: <T>(key: string) => Promise<T | null>
  setItem: <T>(key: string, value: T) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clearStorage: () => Promise<void>
}

export let storageService: StorageService

export const initializeStorage = (storage: StorageService) => {
  storageService = storage
}