// App.tsx
import 'intl-pluralrules';
import './src/config/i18n';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/theme';

// כאן תייבא את המסכים שלך
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ExercisesScreen from './src/screens/ExercisesScreen';
import AddExerciseScreen from './src/screens/AddExerciseScreen';
import ExerciseDetailsScreen from './src/screens/ExerciseDetailsScreen';
import EditExerciseScreen from './src/screens/EditExerciseScreen';
import TrainerDashboardScreen from './src/screens/TrainerDashboardScreen';
import TrainerProfileScreen from './src/screens/TrainerProfileScreen';
import TrainerListScreen from './src/screens/TrainerListScreen';
import AddTraineeScreen from './src/screens/AddTraineeScreen';
import EditTrainerScreen from './src/screens/EditTrainerScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import RoleSelectScreen from './src/screens/RoleSelectScreen';

import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Authentication Screens */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoleSelect" component={RoleSelectScreen} options={{ headerShown: false }} />

          {/* Main Screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />

          {/* Exercise Management */}
          <Stack.Screen name="AddExercise" component={AddExerciseScreen} />
          <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
          <Stack.Screen name="EditExercise" component={EditExerciseScreen} />

          {/* Trainer Screens */}
          <Stack.Screen name="TrainerDashboard" component={TrainerDashboardScreen} />
          <Stack.Screen name="TrainerProfile" component={TrainerProfileScreen} />
          <Stack.Screen name="TrainerList" component={TrainerListScreen} />
          <Stack.Screen name="AddTrainee" component={AddTraineeScreen} />
          <Stack.Screen name="EditTrainer" component={EditTrainerScreen} />

          {/* Admin Screens */}
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
