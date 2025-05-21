import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // כאן תוכל להוסיף לוגיקה אמיתית, כרגע פשוט תבדוק שלא ריקים
    if (!email || !password) {
      Alert.alert("שגיאה", "אנא מלא/י את כל השדות");
      return;
    }
    Alert.alert("התחברת בהצלחה", `שלום ${email}`);
    // לאחר התחברות, נווט לדף הבית או למסך הראשי של המתאמן
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחברות</Text>
      <TextInput
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="התחבר" onPress={handleLogin} color="#258f6a" />
      <Button
        title="אין לי חשבון, הרשמה"
        onPress={() => navigation.navigate("Register")}
        color="#2675d7"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#258f6a",
    textAlign: "center",
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
