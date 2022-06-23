import { TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Sound from "react-native-sound";
import { failButtonSound } from "../../utils/react-native-sound";
import { useAppSelector } from "../../redux/hooks/hooks";
import styles from "./ColorButtonStyle";

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

  const handleUserPress = (): void => {
    const userSucceeded = checkUserSequance(colorEnum);
    if (!userSucceeded) {
      failButtonSound.play();
      return;
    }
    sound.play();
  };

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
        disabled={isComputerTurn || !isGameActive}
        onPress={handleUserPress}
        style={[styles.button, { backgroundColor: color }]}
      ></TouchableOpacity>
    </View>
  );
};

export default ColorButton;
