import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Colors } from "../../constants/theme";

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={styles.overlay}
    >
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  loaderBox: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
  },
});
