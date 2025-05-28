import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import TrainerDashboardScreen from "../screens/TrainerDashboardScreen";
import TrainerListScreen from "../screens/TrainerListScreen";
import TrainerProfileScreen from "../screens/TrainerProfileScreen";
import EditTrainerScreen from "../screens/EditTrainerScreen";
import AddTraineeScreen from "../screens/AddTraineeScreen";
import TraineeProfileScreen from "../screens/TraineeProfileScreen"; // חדש
import type { RootStackParamList } from './RootStackParamList'; // נתיב יחסי לתיקיית AppNavigator.tsx
import ProfileScreen from "@/screens/ProfileScreen";
import ExercisesScreen from "@/screens/ExercisesScreen";
import TraineeListScreen from "@/screens/TraineeListScreen";
import SettingsScreen from "@/screens/SettingsScreen";




const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RoleSelect"
        screenOptions={{
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={{ title: "בחירת תפקיד" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "התחברות" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "הרשמה" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "דף הבית" }}
        />
        {/* מסכי Admin */}
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ title: "אדמין" }}
        />
        {/* מסכי Trainer */}
        <Stack.Screen
          name="TrainerDashboard"
          component={TrainerDashboardScreen}
          options={{ title: "לוח המאמן" }}
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
        {/* מסך Trainee */}
        <Stack.Screen
          name="TraineeList"
          component={TraineeListScreen}
          options={{ title: "רשימת מתאמנים" }}
        />

        <Stack.Screen
          name="TraineeProfile"
          component={TraineeProfileScreen}
          options={{ title: "פרופיל מתאמן" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "פרופיל" }}
        />
        <Stack.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{ title: "ניהול תרגילים" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "הגדרות" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
