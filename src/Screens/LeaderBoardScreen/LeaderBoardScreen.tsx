import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  Button,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/features/isModaleVIsable/isModalVisableSlice";
import { insertHighScore } from "../../redux/features/leaderBoard/leaderBoardSlice";
import AsyncStorageService from "../../services/AsyncStorageService";
import { resetCurrentScore } from "../../redux/features/CurrentScore/currentScoreSlice";
const { width, height } = Dimensions.get("screen");

type LeaderBoardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LeaderBoard"
>;

type LeaderBoardScreenProp = {
  navigation: LeaderBoardScreenNavigationProp;
};

const LeaderBoard: React.FC<LeaderBoardScreenProp> = ({ navigation }) => {
  const highestScores = useAppSelector((state) => state.leaderBoardArray.value);
  const isModalVisable = useAppSelector((state) => state.isModalVisable.value);
  const score = useAppSelector((state) => state.score.value);
  const [text, onChangeText] = useState<string>("");
  const dispatch = useDispatch();


  return (
    <View style={styles.rootContainer}>
      <View style={styles.upperContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisable}
        >
          <View
            style={{
              margin: 30,
              marginVertical: 60,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.scoreText}>Your Score is {score}</Text>
            <Text style={styles.scoreText}>Enter your Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
            {text ? (
              <Button
                title="Save"
                onPress={async () => {
                  dispatch(insertHighScore({ name: text, score }));

                 
                  dispatch(resetCurrentScore());
                  dispatch(closeModal());
                }}
              ></Button>
            ) : null}
          </View>
        </Modal>
        <Text style={styles.titleText}>Top 10 Scores</Text>
        {highestScores.length > 0 &&
          highestScores.map((scoreObj, i) => (
            <Text style={styles.scoreText} key={i}>{`${i + 1}) ${
              scoreObj.name
            }  -  score: ${scoreObj.score}`}</Text>
          ))}
        {highestScores.length === 0 && (
          <Text>Play the game to enter the leader board</Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.button_text}>Play Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    width: width / 2.5,
    height: height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  titleText: {
    marginBottom: 20,
    fontSize: 27,
    fontWeight: "500",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "500",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "wheat",
  },
  input: {
    width: width / 2.5,
    height: height / 25,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default LeaderBoard;
