// src/components/GlobalLoader.js
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../color/color";

export default function GlobalLoader() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
