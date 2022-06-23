import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useAppDispatch } from "../../redux/hooks/hooks";
import AsyncStorageService from "../../services/AsyncStorageService";
import {  insertLoadedHighScore } from "../../redux/features/leaderBoard/leaderBoardSlice";
import styles from "./SplashScreemStyle";


type SplashScreenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

type SplashScreenScreenProp = {
  navigation: SplashScreenScreenNavigationProp;
};

const SplashScreen: React.FC<SplashScreenScreenProp> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const getScores = useCallback(async () => {
      const storedHighScores = await AsyncStorageService.getHighScoreData();
    if (storedHighScores) {
      dispatch(insertLoadedHighScore(storedHighScores));
    }
  }, []);

  useEffect(() => {
    getScores();
  }, []);

  useEffect(() => {
    setTimeout(() => navigation.navigate("Game"), 1500)
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text} >Simon Says</Text>
    </View>
  );
};


export default SplashScreen;
