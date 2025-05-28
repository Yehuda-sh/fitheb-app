// src/screens/LoginScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
} from "react-native";
import { Button } from "@rneui/themed";
import { useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList'; // נתיב יחסי לתיקיית AppNavigator.tsx


import { auth } from "../services/firebase";
import { firestore } from "../services/firestore";
import allUsers from '../data/mock_trainers_and_trainees.json';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const DEMO_USERS = {
  admin: {
    email: "demo.admin@testfitheb.com",
    password: "demoAdmin123"
  }
};

const getRandomUserByRole = (role: "trainer" | "trainee") => {
  const filtered = allUsers.filter(u => u.role === role && u.email && u.password);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // role מתוך ה־route (אם הגיע מ־RoleSelect)
  const role = route?.params?.role;

  useEffect(() => {
    if (!I18nManager.isRTL) I18nManager.forceRTL(true);
    // אם הגיע role - אפשר (אם תרצה) למלא אוטומטית את שם המשתמש לדמו/הצגת טקסט, למשל
    // if (role === "trainer" || role === "trainee") { ... }
  }, [role]);

  const handleLogin = async (customEmail?: string, customPassword?: string) => {
    const finalEmail = customEmail || email;
    const finalPassword = customPassword || password;

    if (!finalEmail || !finalPassword) {
      alert("נא למלא את כל השדות");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth.signInWithEmailAndPassword(finalEmail, finalPassword);
      const user = userCredential.user;
      if (!user) throw new Error("לא נמצא משתמש.");

      const doc = await firestore.collection("users").doc(user.uid).get();
      if (!doc.exists) throw new Error("לא נמצא מידע על המשתמש במסד הנתונים.");

      const roleFromDb = doc.data()?.role;

      if (roleFromDb === "admin") navigation.replace("AdminDashboard");
      else if (roleFromDb === "trainer") navigation.replace("TrainerDashboard");
      else if (roleFromDb === "trainee") navigation.replace("TraineeProfile"); // זהו המסך החדש!
      else throw new Error("תפקיד לא מזוהה.");
    } catch (error: any) {
      alert(error.message || "שגיאה בהתחברות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>התחברות</Text>

      <TextInput
        style={styles.input}
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textAlign="right"
      />

      <Button
        title="התחבר"
        onPress={() => handleLogin()}
        loading={loading}
        containerStyle={styles.buttonContainer}
        disabled={loading}
        buttonStyle={{ borderRadius: 14, backgroundColor: "#23c9c8" }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      />

      <Button
        title="הרשמה"
        type="clear"
        onPress={() => navigation.navigate('Register')}
        titleStyle={{ color: "#fa7132", fontSize: 17 }}
      />

      {/* כפתורי דמו מוקטנים בתחתית המסך */}
      <View style={styles.demoButtons}>
        <Button
          title="אדמין"
          type="outline"
          onPress={() => handleLogin(DEMO_USERS.admin.email, DEMO_USERS.admin.password)}
          buttonStyle={styles.demoButton}
        />
        <Button
          title="מאמן"
          type="outline"
          onPress={() => {
            const trainer = getRandomUserByRole("trainer");
            if (trainer) handleLogin(trainer.email, trainer.password);
          }}
          buttonStyle={styles.demoButton}
        />
        <Button
          title="מתאמן"
          type="outline"
          onPress={() => {
            const trainee = getRandomUserByRole("trainee");
            if (trainee) handleLogin(trainee.email, trainee.password);
          }}
          buttonStyle={styles.demoButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 22,
    fontSize: 26,
    fontWeight: "bold",
    color: "#2675d7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccd5e0",
    borderRadius: 8,
    padding: 13,
    marginBottom: 14,
    textAlign: "right",
    fontSize: 17,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 4,
  },
  demoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,
    paddingHorizontal: 6,
    width: "100%",
  },
  demoButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 70,
    marginHorizontal: 2,
  },
});

export default LoginScreen;
