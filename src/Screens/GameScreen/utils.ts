import colorEnum from "../../Enums/colorEnum";
import { flasBlueButton } from "../../redux/features/FlashButtons/FlashButtonsSlice";
import { blueButtonSound } from "../../utils/react-native-sound";

export interface ButtonObject {

}

export const blueButtonOptionsObj = {
    color: 'blue',
    colorEnum: colorEnum.blue,
    flashButton: () => flasBlueButton(),
    buttonSond: blueButtonSound,
}