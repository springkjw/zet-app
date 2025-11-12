import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStorageAdapter<T> {
  key: string;
  parse: (value: string) => T;
  stringify: (value: T) => string;
}

class AsyncStorageManager {
  async set<T>(adapter: IStorageAdapter<T>, value: T): Promise<void> {
    try {
      const stringValue = adapter.stringify(value);
      await AsyncStorage.setItem(adapter.key, stringValue);
    } catch (error) {
      console.error(`AsyncStorage set error for key "${adapter.key}":`, error);
      throw error;
    }
  }

  async get<T>(adapter: IStorageAdapter<T>): Promise<T | null> {
    try {
      const stringValue = await AsyncStorage.getItem(adapter.key);
      if (stringValue === null) {
        return null;
      }
      return adapter.parse(stringValue);
    } catch (error) {
      console.error(`AsyncStorage get error for key "${adapter.key}":`, error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`AsyncStorage remove error for key "${key}":`, error);
      throw error;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`AsyncStorage has error for key "${key}":`, error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("AsyncStorage clear error:", error);
      throw error;
    }
  }
}

export const asyncStorage = new AsyncStorageManager();
