import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("שגיאה", "אנא מלא/י את כל השדות");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("שגיאה", "הסיסמאות לא תואמות");
      return;
    }
    Alert.alert("הרשמה הצליחה", `ברוך הבא, ${email}!`);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשמה</Text>
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
      <TextInput
        placeholder="אישור סיסמה"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="הרשם" onPress={handleRegister} color="#258f6a" />
      <Button
        title="כבר יש לי חשבון, התחברות"
        onPress={() => navigation.navigate("Login")}
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
