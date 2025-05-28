// src/navigation/RootNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// מסכים (השלם נתיבים במידת הצורך)
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import TraineeProfileScreen from "../screens/TraineeProfileScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import TrainerDashboardScreen from "../screens/TrainerDashboardScreen";
import TrainerListScreen from "../screens/TrainerListScreen";
import TrainerProfileScreen from "../screens/TrainerProfileScreen";
import EditTrainerScreen from "../screens/EditTrainerScreen";
import AddTraineeScreen from "../screens/AddTraineeScreen";
import TraineeListScreen from "../screens/TraineeListScreen";
import AddExerciseScreen from "../screens/AddExerciseScreen";
import EditExerciseScreen from "../screens/EditExerciseScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
import TraineeDashboardScreen from "../screens/TraineeDashboardScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import WorkoutSelectScreen from "../screens/WorkoutSelectScreen";

import type { RootStackParamList } from "./RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#2675d7" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "דף הבית" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "פרופיל" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "הגדרות" }}
        />
        <Stack.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{ title: "תרגילים" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "התחברות", headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "הרשמה", headerShown: false }}
        />
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={{ title: "בחירת תפקיד" }}
        />
        <Stack.Screen
          name="TraineeProfile"
          component={TraineeProfileScreen}
          options={{ title: "פרופיל מתאמן" }}
        />
        <Stack.Screen
          name="TraineeDashboard"
          component={TraineeDashboardScreen}
          options={{ title: "לוח בקרה - מתאמן" }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{ title: "אימון" }}
        />

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ title: "לוח בקרה - אדמין" }}
        />
        <Stack.Screen
          name="TrainerDashboard"
          component={TrainerDashboardScreen}
          options={{ title: "לוח בקרה - מאמן" }}
        />
        <Stack.Screen
          name="TrainerList"
          component={TrainerListScreen}
          options={{ title: "רשימת מאמנים" }}
        />
        <Stack.Screen
          name="TrainerProfile"
          component={TrainerProfileScreen}
          options={{ title: "פרופיל מאמן" }}
        />
        <Stack.Screen
          name="EditTrainer"
          component={EditTrainerScreen}
          options={{ title: "עריכת מאמן" }}
        />
        <Stack.Screen
          name="AddTrainee"
          component={AddTraineeScreen}
          options={{ title: "הוספת מתאמן" }}
        />
        <Stack.Screen
          name="TraineeList"
          component={TraineeListScreen}
          options={{ title: "רשימת מתאמנים" }}
        />

        <Stack.Screen
          name="WorkoutSelect"
          component={WorkoutSelectScreen}
          options={{ title: "בחירת אימון" }}
        />
        <Stack.Screen
          name="AddExercise"
          component={AddExerciseScreen}
          options={{ title: "הוספת תרגיל" }}
        />
        <Stack.Screen
          name="EditExercise"
          component={EditExerciseScreen}
          options={{ title: "עריכת תרגיל" }}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetailsScreen}
          options={{ title: "פרטי תרגיל" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
