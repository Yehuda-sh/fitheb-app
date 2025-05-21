import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ברוך הבא ל־FitHeb!</Text>
      <Text style={styles.text}>
        האפליקציה שמביאה תרגול וכושר לקהילה הישראלית.
      </Text>
      <Button
        title="התחברות"
        color="#258f6a"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="הרשמה"
        color="#2675d7"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

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
  text: { fontSize: 18, color: "#333", marginBottom: 32 },
});
