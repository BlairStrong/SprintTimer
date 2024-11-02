import React, { useState, useEffect } from "react";
import playBeep from "C:/Users/blair/ReactNative/SprintTimer/components/playBeep";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const StartDelayTimer = ({ startTime, onGoBack }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      playBeep();
      return;
    }

    // take the input time as the starting point

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Change interval to 1000 ms for seconds

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{timeLeft} seconds left</Text>
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
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
