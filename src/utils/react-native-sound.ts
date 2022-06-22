import Sound from "react-native-sound";

Sound.setCategory("Playback");

const initSound = (fileName: string): Sound => {
  return new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }
  });
};

const blueButtonSound = initSound("bluesound");
const redButtonSound = initSound("redsound");
const yellowButtonSound = initSound("yellowsound");
const greenButtonSound = initSound("greensound");
const failButtonSound = initSound("failsound");

export {
  blueButtonSound,
  redButtonSound,
  yellowButtonSound,
  greenButtonSound,
  failButtonSound,
};
