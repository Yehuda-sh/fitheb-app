import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Button, Card, useTheme } from "@rneui/themed";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";
import { demoWorkoutPlan } from "../data/demoWorkoutPlan";
import { auth } from "../services/firebase";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  muscle?: string;
  notes?: string;
};

export default function WorkoutScreen({ navigation, route }: Props) {
  const { theme } = useTheme();
  // מקבל את היום (אינדקס) מה־route
  const { workoutIdx } = route.params || {};
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // טעינת תרגילים לפי היום
    setLoading(true);
    if (typeof workoutIdx === "number" && demoWorkoutPlan.days[workoutIdx]) {
      setExercises(demoWorkoutPlan.days[workoutIdx].exercises);
    } else {
      setExercises([]);
    }
    setCurrentIndex(0);
    setLoading(false);
  }, [workoutIdx]);

  const handleCompleteExercise = () => {
    if (currentIndex < exercises.length - 1) setCurrentIndex((i) => i + 1);
    else handleFinishWorkout();
  };

  const handleFinishWorkout = () => {
    Alert.alert("כל הכבוד!", "סיימת את כל האימון!", [
      {
        text: "חזרה ללוח בקרה",
        onPress: () => navigation.replace("TraineeDashboard"),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>טוען אימון...</Text>
      </View>
    );
  }

  if (!exercises.length) {
    return (
      <View style={styles.center}>
        <Text>אין אימון ליום שבחרת.</Text>
        <Button title="חזור" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const current = exercises[currentIndex];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text h3 style={styles.title}>
        אימון ליום {demoWorkoutPlan.days[workoutIdx]?.day || ""}
      </Text>

      <Card containerStyle={styles.card}>
        <Card.Title>{current.name}</Card.Title>
        <Card.Divider />
        <Text>סטים: {current.sets}</Text>
        <Text>חזרות: {current.reps}</Text>
        {current.muscle && <Text>קבוצת שריר: {current.muscle}</Text>}
        {current.notes ? (
          <Text style={styles.notes}>הערות: {current.notes}</Text>
        ) : null}
      </Card>

      <Button
        title={
          currentIndex < exercises.length - 1
            ? "השלם תרגיל, עבור לבא"
            : "סיים אימון"
        }
        onPress={handleCompleteExercise}
        buttonStyle={styles.nextButton}
      />

      <Text style={styles.progress}>
        תרגיל {currentIndex + 1} מתוך {exercises.length}
      </Text>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2675d7",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    width: "98%",
    borderRadius: 18,
    marginBottom: 26,
  },
  nextButton: {
    backgroundColor: "#23c9c8",
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 10,
    minWidth: 180,
  },
  progress: {
    marginTop: 18,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  notes: {
    marginTop: 8,
    fontSize: 15,
    color: "#555",
  },
});
