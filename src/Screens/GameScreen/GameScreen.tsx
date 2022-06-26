import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  blueButtonSound,
  greenButtonSound,
  redButtonSound,
  yellowButtonSound,
} from "../../utils/react-native-sound";
import ColorButton from "../../Components/ColorButton/ColorButton";

import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import {
  resestArray,
  updateArray,
} from "../../redux/features/sequanceArray/sequanceArraySlice";
import colorEnum from "../../Enums/colorEnum";
import {
  resetCurrentScore,
  updateCurrentScore,
} from "../../redux/features/CurrentScore/currentScoreSlice";
import {
  startGame,
  stopGame,
} from "../../redux/features/isGameActive/isGameAvticeSlice";
import { openModal } from "../../redux/features/isModaleVIsable/isModalVisableSlice";
import styles from "./GameScreenStyle";
import { blueButtonOptionsObj } from "./utils";

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

type GameScreenProp = {
  navigation: GameScreenNavigationProp;
};

const GameScreen: React.FC<GameScreenProp> = ({ navigation }) => {
  const [flashBlue, setFlashBlue] = useState<boolean>(false);
  const [flashRed, setFlashRed] = useState<boolean>(false);
  const [flashYellow, setFlashYellow] = useState<boolean>(false);
  const [flashGreen, setFlashGreen] = useState<boolean>(false);
  const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);
  const [sequanceCount, setSequanceCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const sequanceArray = useAppSelector((state) => state.sequanceArray.value);
  const score = useAppSelector((state) => state.score.value);
  const isGameActive = useAppSelector((state) => state.isGameActive.value);
  const dispatch = useAppDispatch();
  blueButtonOptionsObj;
  dispatch(blueButtonOptionsObj.flashButton);
  const colors = [
    colorEnum.red,
    colorEnum.blue,
    colorEnum.green,
    colorEnum.yellow,
  ];

  const buttonActivators = [
    setFlashRed,
    setFlashBlue,
    setFlashGreen,
    setFlashYellow,
  ];

  const playGame = (): void => {
    dispatch(startGame());
  };

  const playSequance = (): void => {
    sequanceArray.forEach((number, i) => {
      setTimeout(() => {
        buttonActivators[colors[number]](true);
        setTimeout(() => buttonActivators[colors[number]](false), 350);
        if (i + 1 === sequanceArray.length)
          setTimeout(() => {
            setMessage("Your Turn");
            setIsComputerTurn(false);
          }, 700);
      }, i * 700);
    });
  };

  const checkUserSequance = (currentStep: number): boolean => {
    if (sequanceArray[sequanceCount] !== currentStep) {
      dispatch(openModal());
      navigation.navigate("LeaderBoard");
      resetAllStates();
      return false;
    } else {
      if (sequanceArray.length === sequanceCount + 1) {
        setMessage("");
        setSequanceCount(0);
        dispatch(updateCurrentScore());
        setIsComputerTurn(true);
      } else {
        setSequanceCount(sequanceCount + 1);
      }
    }
    return true;
  };

  const addRandomStepToSeq = (): void => {
    const randomNumber = Math.floor(Math.random() * 3);
    dispatch(updateArray(randomNumber));
  };

  const resetAllStates = (): void => {
    setMessage("");
    dispatch(resestArray());
    setSequanceCount(0);
    dispatch(stopGame());
  };

  useEffect(() => {
    if (isComputerTurn) {
      setTimeout(() => setMessage("Simon Says!"), 300);
      setTimeout(addRandomStepToSeq, 700);
    }
  }, [isComputerTurn]);

  useEffect(() => {
    if (isGameActive) {
      setIsComputerTurn(true);
    }
  }, [isGameActive]);

  useEffect(() => {
    if (sequanceArray.length > 0) {
      playSequance();
    }
  }, [sequanceArray]);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.upperContainer}>
        <Text
          style={[
            styles.titleText,
            isComputerTurn && styles.titleText_typeRed,
            ,
            !isComputerTurn && styles.titleText_typeGreen,
          ]}
        >
          {message}
        </Text>
        <Text style={styles.scoreText}>{`Your score: ${score}`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.upperButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.blue}
            isComputerTurn={isComputerTurn}
            sound={blueButtonSound}
            color={"blue"}
            isFlash={flashBlue}
            checkUserSequance={checkUserSequance}
          />
          <ColorButton
            colorEnum={colorEnum.red}
            sound={redButtonSound}
            color={"red"}
            isFlash={flashRed}
            isComputerTurn={isComputerTurn}
            checkUserSequance={checkUserSequance}
          />
        </View>
        <View style={styles.lowerButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.yellow}
            isComputerTurn={isComputerTurn}
            sound={yellowButtonSound}
            color={"yellow"}
            isFlash={flashYellow}
            checkUserSequance={checkUserSequance}
          />
          <ColorButton
            colorEnum={colorEnum.green}
            isComputerTurn={isComputerTurn}
            sound={greenButtonSound}
            color={"green"}
            isFlash={flashGreen}
            checkUserSequance={checkUserSequance}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {!isGameActive && (
          <TouchableOpacity
            disabled={isGameActive}
            style={styles.button}
            onPress={() => setTimeout(playGame, 550)}
          >
            <Text style={styles.button_text}>Play</Text>
          </TouchableOpacity>
        )}
        {!isGameActive && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LeaderBoard")}
          >
            <Text style={styles.button_text}>Leader board</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GameScreen;


