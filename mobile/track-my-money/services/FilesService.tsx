import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export default class FilesService {
  public async save(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      return await FileSystem.writeAsStringAsync(key, value);
    }
  }

  public async get(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await FileSystem.readAsStringAsync(key);
    }
  }
}
