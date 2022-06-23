import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Sound from "react-native-sound";
import { failButtonSound } from "../../utils/react-native-sound";
import { useAppSelector } from "../../redux/hooks/hooks";

interface ButtonProps {
  color: string;
  sound: Sound;
  isFlash: boolean;
  isComputerTurn: boolean;
  colorEnum: number;
  checkUserSequance: (currentStep: number) => boolean;
}

const ColorButton: React.FC<ButtonProps> = ({
  color,
  sound,
  isFlash,
  isComputerTurn,
  colorEnum,
  checkUserSequance,
}) => {
  const isGameActive = useAppSelector((state) => state.isGameActive.value);

  useEffect(() => {
    sound.setVolume(1);
    failButtonSound.setVolume(1);

    return () => {
      failButtonSound.release();

      sound.release();
    };
  }, []);
  useEffect(() => {
    if (isFlash) {
      sound.play();
    }
  }, [isFlash]);

  return (
    <View style={[styles.container, isFlash && styles.flash]}>
      <TouchableOpacity
        disabled={isComputerTurn || !isGameActive }
        onPress={() => {
          const userSucceeded = checkUserSequance(colorEnum);
          if (!userSucceeded) {
            failButtonSound.play();
            return;
          }
          sound.play();
        }}
        style={[styles.button, { backgroundColor: color }]}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  flash: {
    opacity: 0.4,
  },
});

export default ColorButton;
