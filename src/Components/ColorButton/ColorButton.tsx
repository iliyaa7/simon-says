import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Sound from "react-native-sound";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { updateValue } from "../../redux/features/userCurrentStep/userCurrentStepSlice";
import { failButtonSound } from "../../utils/react-native-sound";

interface ButtonProps {
  color: string;
  sound: Sound;
  isFlash: boolean;
  isDisabled: boolean;
  colorEnum: number;
  checkUserSequance: (currentStep: number) => boolean;
}

const ColorButton: React.FC<ButtonProps> = ({
  color,
  sound,
  isFlash,
  isDisabled,
  colorEnum,
  checkUserSequance,
}) => {
  const currentStep = useAppSelector((state) => state.userCurrentStep.value);
  const sequanceArray = useAppSelector((state) => state.sequanceArray.value);
  const dispatch = useAppDispatch();
  const [sequanceCount, setSequanceCount] = useState<number>(0);

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
        disabled={isDisabled}
        onPress={() => {
          const userSucceeded = checkUserSequance(colorEnum);
          if (!userSucceeded) {
            failButtonSound.play();
            return
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

// const ColorButton = React.forwardRef<Button, ButtonProps>(({sound, color}, ref) => {
//   useEffect(() => {
//     sound.setVolume(1);

//     return () => {
//       sound.release();
//     };
//   }, []);
//   return   <>
//   <Button
//   title="a"
//     onPress={() => sound.play()}
//     ref={ref}
//   ></Button>
// </>;
// });
