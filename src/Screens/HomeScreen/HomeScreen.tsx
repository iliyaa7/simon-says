import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  blueButtonSound,
  failButtonSound,
  greenButtonSound,
  redButtonSound,
  yellowButtonSound,
} from "../../utils/react-native-sound";
import ColorButton from "../../Components/ColorButton/ColorButton";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import {
  resestArray,
  updateArray,
} from "../../redux/features/sequanceArray/sequanceArraySlice";
import colorEnum from "../../Enums/colorEnum";

const { width, height } = Dimensions.get("screen");

const HomeScreen: React.FC = () => {
  const [flashBlue, setFlashBlue] = useState<boolean>(false);
  const [flashRed, setFlashRed] = useState<boolean>(false);
  const [flashYellow, setFlashYellow] = useState<boolean>(false);
  const [flashGreen, setFlashGreen] = useState<boolean>(false);
  const [isRoundActive, setIsRoundActive] = useState<boolean>(false);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);
  const [sequanceCount, setSequanceCount] = useState<number>(0);
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

  // The `state` arg is correctly typed as `RootState` already
  const currentStep = useAppSelector((state) => state.userCurrentStep.value);
  const sequanceArray = useAppSelector((state) => state.sequanceArray.value);
  const dispatch = useAppDispatch();

  const startGame = (): void => {
    setIsComputerTurn(true);
    setIsGameActive(true);
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
    if(!isGameActive) return true
    if (sequanceArray[sequanceCount] === currentStep) {
      if (sequanceArray.length === sequanceCount + 1) {
        setSequanceCount(0);
        setTimeout(() => setIsUserTurn(false), 1500);
        return true;
      }
    } else {
      setIsGameActive(false);
      setSequanceCount(0);
      resetAllStates();
      setTimeout(() => setIsUserTurn(false), 1500);
      setIsGameActive(false);
      return false;
    }
    setSequanceCount(sequanceCount + 1);
    return true;
  };

  const addRandomStepToSeq = (): void => {
    const randomNumber = Math.floor(Math.random() * 3);
    dispatch(updateArray(randomNumber));
  };

  const resetAllStates = (): void => {
    dispatch(resestArray());
    setSequanceCount(0);
    setIsGameActive(false);
    setIsComputerTurn(false);
    setIsRoundActive(false);
  };

  useEffect(() => {
    if (isComputerTurn) {
      addRandomStepToSeq();
      setIsRoundActive(true);
    }
    if (!isComputerTurn) {
      setIsRoundActive(false);
      setIsUserTurn(true);
    }
  }, [isComputerTurn]);

  useEffect(() => {
    if (isGameActive) {
      if (!isUserTurn && !isComputerTurn && !isRoundActive) {
        setIsComputerTurn(true);
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
        <Text>Simon says</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.upperButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.blue}
            isDisabled={isRoundActive}
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
            isDisabled={isRoundActive}
            checkUserSequance={checkUserSequance}
          />
        </View>
        <View style={styles.lowerButtonsContainer}>
          <ColorButton
            colorEnum={colorEnum.yellow}
            isDisabled={isRoundActive}
            sound={yellowButtonSound}
            color={"yellow"}
            isFlash={flashYellow}
            checkUserSequance={checkUserSequance}
          />
          <ColorButton
            colorEnum={colorEnum.green}
            isDisabled={isRoundActive}
            sound={greenButtonSound}
            color={"green"}
            isFlash={flashGreen}
            checkUserSequance={checkUserSequance}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          disabled={isGameActive}
          style={styles.startButton}
          onPress={startGame}
        >
          <Text style={styles.startButton_text}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={resetAllStates}>
          <Text style={styles.startButton_text}>Reset</Text>
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
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 0.4,
    flexDirection: "row",
  },
  upperButtonsContainer: {
    flex: 0.5,
    flexDirection: "column",
  },
  lowerButtonsContainer: {
    flex: 0.5,
    flexDirection: "column",
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "black",
    width: width / 2,
    height: height / 14,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  testButton: {
    backgroundColor: "green",
    width: width / 2,
    height: height / 14,
  },
});
export default HomeScreen;

// let touchable = useRef<Button>(null);
// const blueButtonReff = useRef<Button>(null);
// const redButtonReff = useRef<Button>(null);
// const yellowButtonReff = useRef<Button>(null);
// const greenButtonReff = useRef<Button>(null);
