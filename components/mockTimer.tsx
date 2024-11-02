import React, { useState, useEffect } from "react";
import playBeep from "C:/Users/blair/ReactNative/SprintTimer/components/playBeep";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const StartDelayTimer = ({ startTime, onGoBack }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateElapsedTime = () => {
      setTimer(Date.now() - startTime);
    };

    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text>{timer / 1000}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default StartDelayTimer;
