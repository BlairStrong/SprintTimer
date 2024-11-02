import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StartDelayTimer from "../../components/StartDelayTimer";

const InputScreen = () => {
  const [distance, setDistance] = useState("");
  const [delay, setDelay] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Reset inputs and timer every time the screen is focused
      setDistance("");
      setDelay("");
      setShowTimer(false);
    }, [])
  );

  const handleSubmit = () => {
    if (isNaN(distance) || isNaN(delay)) {
      Alert.alert("Invalid Input", "Please enter numbers for both fields.");
      return;
    }
    setShowTimer(false); // Reset the timer
    setTimeout(() => setShowTimer(true), 0); // Start the timer again
  };

  const handleGoBack = () => {
    setShowTimer(false);
  };

  return (
    <View style={styles.container}>
      {!showTimer ? (
        <>
          <Text style={styles.label}>Enter Distance (km):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
            placeholder="Distance in km"
          />
          <Text style={styles.label}>Seconds to walk to Start:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={delay}
            onChangeText={setDelay}
            placeholder="Delay in seconds"
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      ) : (
        <StartDelayTimer
          startTime={parseInt(delay, 10)}
          onGoBack={handleGoBack}
        />
      )}
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
});

export default InputScreen;
