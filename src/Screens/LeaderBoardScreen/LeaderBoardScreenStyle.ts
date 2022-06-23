import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

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
      color: "#808080",
      marginBottom: 20,
      fontSize: 27,
      fontWeight: "500",
    },
    scoreText: {
      color: "#808080",
      fontSize: 20,
      fontWeight: "500",
    },
    messageText: {
      color: "#808080",
      fontSize: 15,
      fontWeight: "300",
    },
  });
  export default styles