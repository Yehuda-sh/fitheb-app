import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const TypedHomeScreen = HomeScreen as React.ComponentType<any>;
const TypedLoginScreen = LoginScreen as React.ComponentType<any>;
const TypedRegisterScreen = RegisterScreen as React.ComponentType<any>;

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TypedHomeScreen}
          options={{ title: "דף הבית" }}
        />
        <Stack.Screen
          name="Login"
          component={TypedLoginScreen}
          options={{ title: "התחברות" }}
        />
        <Stack.Screen
          name="Register"
          component={TypedRegisterScreen}
          options={{ title: "הרשמה" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
