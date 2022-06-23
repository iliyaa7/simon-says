import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");


const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      padding: 20
    },
    upperContainer: {
      flex: 0.1,
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
      flex: 0.3,
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
    button_Stop: {
      backgroundColor: "red",
    },
    button_text: {
      color: "white",
      fontSize: 20,
      fontWeight: "400",
    },
    titleText: {
      fontSize: 27,
      fontWeight: "500",
    },
    titleText_typeRed: {
      color: "red",
    },
    titleText_typeGreen: {
      color: "green",
    },
  });
  export default styles