import { useEffect, useState, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevices,
  CameraType,
} from "react-native-vision-camera";

const OpenCamera = ({ onGoBack }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });
  const devices = useCameraDevices();
  const device = devices.back; // or devices.front for front camera
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "authorized");
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(captureFrame, 100); // Capture frame every 100 ms
    return () => clearInterval(interval);
  }, [hasPermission]);

  const captureFrame = async () => {
    if (cameraRef.current) {
      // Capture a frame from the camera
      const photo = await cameraRef.current.takePhoto({
        quality: 85,
        skipProcessing: true,
      });

      if (photo.path) {
        analyzeImage(photo.path); // Analyze the captured image
      }
    }
  };

  const analyzeImage = async (uri) => {
    try {
      // Here you can analyze the image data, e.g., calculate average color
      // You can use any image processing library or your custom logic

      const result = await calculateAverageColor(uri); // Implement this function
      setAverageColor(result);
    } catch (error) {
      console.error("Image processing error: ", error);
    }
  };

  const calculateAverageColor = async (uri) => {
    // Placeholder function: Implement logic to calculate the average color
    // You could load the image, get pixel data, and calculate the average
    // Return an object with average color values { r, g, b }
    return { r: 128, g: 128, b: 128 }; // Example static return
  };

  if (!device || !hasPermission) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        ref={cameraRef}
        isActive={true}
      />

      {/* Statistics Display */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          Average Color: R: {averageColor.r}, G: {averageColor.g}, B:{" "}
          {averageColor.b}
        </Text>
      </View>

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
  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  statsContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  statText: {
    color: "white",
    marginBottom: 5,
  },
  goBackButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    color: "white",
    borderRadius: 5,
  },
});

export default OpenCamera;
