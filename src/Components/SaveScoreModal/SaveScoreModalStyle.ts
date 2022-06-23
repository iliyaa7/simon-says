import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    scoreText: {
      color: "#808080",
      fontSize: 20,
      fontWeight: "500",
    },
    modal: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "wheat",
    },
    modalCotainer: {
      margin: 30,
      marginVertical: 60,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      color: "#808080",
      width: width / 2.5,
      height: height / 25,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  export default styles