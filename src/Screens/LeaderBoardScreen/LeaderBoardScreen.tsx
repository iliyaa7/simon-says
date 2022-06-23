import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useAppSelector } from "../../redux/hooks/hooks";
import SaveScoreModal from "../../Components/SaveScoreModal/SaveScoreModal";
import styles from "./LeaderBoardScreenStyle";

type LeaderBoardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LeaderBoard"
>;

type LeaderBoardScreenProp = {
  navigation: LeaderBoardScreenNavigationProp;
};

const LeaderBoard: React.FC<LeaderBoardScreenProp> = ({ navigation }) => {
  const highestScores = useAppSelector((state) => state.leaderBoardArray.value);

  const createHighScoreEntry = (
    index: number,
    name: string,
    score: number
  ): string => {
    return `${index + 1}) ${name}  -  score: ${score}`;
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.upperContainer}>
        <SaveScoreModal />
        <Text style={styles.titleText}>Top 10 Scores</Text>
        {highestScores.length > 0 &&
          highestScores.map((highScoreObj, i) => (
            <Text style={styles.scoreText} key={i}>
              {createHighScoreEntry(i, highScoreObj.name, highScoreObj.score)}
            </Text>
          ))}
        {highestScores.length === 0 && (
          <Text style={styles.messageText}>
            Play the game to enter the leader board
          </Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.button_text}>Play </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaderBoard;
