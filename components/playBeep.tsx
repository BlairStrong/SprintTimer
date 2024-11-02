import { Audio } from "expo-av";
import { useState, useEffect } from "react";

const playBeep = async () => {
  const currentTime = new Date();
  const { sound } = await Audio.Sound.createAsync(
    require("C:/Users/blair/ReactNative/SprintTimer/assets/beep.mp3")
  );
  await sound.playAsync();
  return currentTime.toLocaleTimeString();
};

export default playBeep;
