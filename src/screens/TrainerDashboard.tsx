import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TrainerDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍🏫 לוח בקרה של מאמן</Text>
      <Text style={styles.subtitle}>כאן תוכל לנהל את המתאמנים שלך 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2675d7",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});
