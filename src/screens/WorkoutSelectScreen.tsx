// src/screens/WorkoutSelectScreen.tsx

import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { demoWorkoutPlan } from "../data/demoWorkoutPlan";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

export default function WorkoutSelectScreen({ navigation }: Props) {
  const { theme } = useTheme();

  const handleSelect = (workoutIdx: number) => {
    // נעביר לפרופס או ל־WorkoutScreen את כל התרגילים של אותו יום
    navigation.navigate("Workout", { workoutIdx });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>בחר יום אימון</Text>
      {demoWorkoutPlan.days.map((day, idx) => (
        <Button
          key={day.day}
          title={`אימון ליום ${day.day}`}
          onPress={() => handleSelect(idx)}
          buttonStyle={styles.button}
          containerStyle={{ marginBottom: 12, width: 250 }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2675d7",
  },
  button: {
    backgroundColor: "#23c9c8",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
});
