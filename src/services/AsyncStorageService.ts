import { RowType } from "./../redux/features/leaderBoard/leaderBoardSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncStorageService {
  constructor() {}

  setHighScoreData = async (value: RowType[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("highScore", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  getHighScoreData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("highScore");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  removeData = async () => {
    try {
      await AsyncStorage.removeItem("highScore");
    } catch (e) {
      console.log(e);
    }
  };
}

export default new AsyncStorageService();
