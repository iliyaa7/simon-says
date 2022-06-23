import {
  Button,
  Modal,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { useAppSelector } from "../../redux/hooks/hooks";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { insertHighScore } from "../../redux/features/leaderBoard/leaderBoardSlice";
import { resetCurrentScore } from "../../redux/features/CurrentScore/currentScoreSlice";
import { closeModal } from "../../redux/features/isModaleVIsable/isModalVisableSlice";
import styles from "./SaveScoreModalStyle";

const SaveScoreModal: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const isModalVisable = useAppSelector((state) => state.isModalVisable.value);
  const currentScore = useAppSelector((state) => state.score.value);
  const dispatch = useDispatch();

  const handleSaveScore = (): void => {
    dispatch(
      insertHighScore({
        name: userName,
        score: currentScore,
      })
    );
    dispatch(resetCurrentScore());
    dispatch(closeModal());
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={isModalVisable}>
        <View style={styles.modalCotainer}>
          <Text style={styles.scoreText}>Your Score is {currentScore}</Text>
          <Text style={styles.scoreText}>Enter your Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
          />
          {userName ? (
            <Button
              title="Save"
              onPress={handleSaveScore}
            ></Button>
          ) : null}
        </View>
      </Modal>
    </>
  );
};

export default SaveScoreModal;


