import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>ברוך הבא ל־FitHeb!</Text>
    <Text style={styles.text}>זהו מסך הבית הראשוני.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#258f6a",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default HomeScreen;
