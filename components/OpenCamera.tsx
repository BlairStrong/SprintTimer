import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const OpenCamera = ({ onGoBack }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      {/* Camera View with specified width and height */}
      <CameraView style={styles.camera} facing={facing} />

      {/* Flip Camera button below the CameraView */}
      <View style={styles.buttonContainer}>
        <Button title="Flip Camera" onPress={toggleCameraFacing} color="#fff" />
      </View>

      {/* Go Back button positioned lower and to the right */}
      <Button
        title="Back to Inputs"
        onPress={onGoBack}
        style={styles.goBackButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "10%", // Narrow width for vertical shape
    height: "100%", // Full height
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  goBackButton: {
    position: "absolute",
    bottom: 30, // Position the button 30 units from the bottom of the screen
    right: 20, // Position the button 20 units from the right
    padding: 10,
    backgroundColor: "#2196F3", // Button color for visibility
    color: "white", // Text color
    borderRadius: 5,
  },
});

export default OpenCamera;
