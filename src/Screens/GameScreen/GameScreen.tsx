import { View, Text, TouchableOpacity  } from "react-native";
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
import { resetCurrentScore, updateCurrentScore } from "../../redux/features/CurrentScore/currentScoreSlice"
import {
  startGame,
  stopGame,
} from "../../redux/features/isGameActive/isGameAvticeSlice";
import { openModal } from "../../redux/features/isModaleVIsable/isModalVisableSlice";
import styles from "./GameScreenStyle";


type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

type GameScreenProp = {
  navigation: GameScreenNavigationProp;
};

const GameScreen: React.FC<GameScreenProp> = ({ navigation }) => {
  const [flashBlue, setFlashBlue] = useState<boolean>(false);
  const [flashRed, setFlashRed] = useState<boolean>(false);
  const [flashYellow, setFlashYellow] = useState<boolean>(false);
  const [flashGreen, setFlashGreen] = useState<boolean>(false);
  const [isRoundActive, setIsRoundActive] = useState<boolean>(false);
  const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);
  const [sequanceCount, setSequanceCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  
  const sequanceArray = useAppSelector((state) => state.sequanceArray.value);
  const score = useAppSelector((state) => state.score.value);
  const isGameActive = useAppSelector((state) => state.isGameActive.value);
  const dispatch = useAppDispatch();

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
    setMessage("");
    setIsComputerTurn(true);
    dispatch(startGame());
  };

  const playSequance = (): void => {
    sequanceArray.forEach((number, i) => {
      setTimeout(() => {
        buttonActivators[colors[number]](true);
        setTimeout(() => buttonActivators[colors[number]](false), 350);
        if (i + 1 === sequanceArray.length)
          setTimeout(() => setIsComputerTurn(false), 1000);
      }, i * 700);
    });
  };

  const checkUserSequance = (currentStep: number): boolean => {
    if (sequanceArray[sequanceCount] !== currentStep) {
      dispatch(openModal())
      navigation.navigate('LeaderBoard')
      resetAllStates();
      return false;
    } else {
      if (sequanceArray.length === sequanceCount + 1) {
        setSequanceCount(0);
        dispatch(updateCurrentScore());
        setIsUserTurn(false);
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
    dispatch(resestArray());
    setSequanceCount(0);
    dispatch(stopGame());
    setIsUserTurn(false);
    setIsComputerTurn(false);
    setIsRoundActive(false);
  };

  useEffect(() => {
    if (isComputerTurn) {
      addRandomStepToSeq();
      setIsRoundActive(true);
      setMessage("Simon Says!");
    }
    if (!isComputerTurn && isGameActive) {
      setIsRoundActive(false);
      setIsUserTurn(true);
      setMessage("Your Turn");
    }
  }, [isComputerTurn]);

  useEffect(() => {
    if (isGameActive) {
      if (!isUserTurn && !isComputerTurn && !isRoundActive) {
        setTimeout(() => setIsComputerTurn(true), 1000);
      }
    }
  }, [isGameActive, isComputerTurn, isRoundActive, isUserTurn]);

  useEffect(() => {
    if (isRoundActive) {
      playSequance();
    }
  }, [isRoundActive]);


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
        <Text>{`Your score: ${score}`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.upperButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.blue}
            isComputerTurn={!isUserTurn}
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
            isComputerTurn={!isUserTurn}
            checkUserSequance={checkUserSequance}
          />
        </View>
        <View style={styles.lowerButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.yellow}
            isComputerTurn={!isUserTurn}
            sound={yellowButtonSound}
            color={"yellow"}
            isFlash={flashYellow}
            checkUserSequance={checkUserSequance}
          />
          <ColorButton
            colorEnum={colorEnum.green}
            isComputerTurn={!isUserTurn}
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
        {isGameActive && (
          <TouchableOpacity
            style={[styles.button, styles.button_Stop]}
            onPress={() => {
              setMessage("");
              dispatch(resetCurrentScore())
              resetAllStates();
            }}
          >
            <Text style={styles.button_text}>Reset Game</Text>
          </TouchableOpacity>
        )}
       {!isGameActive && <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LeaderBoard")}
        >
          <Text style={styles.button_text}>Leader board</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
};


export default GameScreen;


