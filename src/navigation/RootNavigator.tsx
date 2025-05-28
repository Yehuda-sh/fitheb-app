import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

// מסכים
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoleSelectScreen from '../screens/RoleSelectScreen';
import TraineeProfileScreen from '../screens/TraineeProfileScreen'; // ← חדש
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('screens.home.title'),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: t('screens.profile.title'),
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t('screens.settings.title'),
          }}
        />
        <Stack.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{
            title: t('screens.exercises.title'),
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'התחברות',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'הרשמה',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={{
            title: 'בחירת תפקיד',
          }}
        />
        <Stack.Screen
          name="TraineeProfile"
          component={TraineeProfileScreen}
          options={{
            title: 'פרופיל מתאמן',
            headerBackVisible: false, // לא ניתן לחזור להתחברות
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
