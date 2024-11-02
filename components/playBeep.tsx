import { Audio } from "expo-av";

const playBeep = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("C:/Users/blair/ReactNative/SprintTimer/assets/beep.mp3")
  );
  await sound.playAsync();
};

export default playBeep;
