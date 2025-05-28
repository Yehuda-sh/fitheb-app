// src/screens/RegisterScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";

import { auth } from "../services/firebase";
import { firestore } from "../services/firestore";
import { Button } from "@rneui/themed";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"trainer" | "trainee" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !role) {
      Alert.alert("שגיאה", "נא למלא את כל השדות ולבחור תפקיד");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (!user) {
        Alert.alert("שגיאה", "לא הצלחנו ליצור את המשתמש.");
        return;
      }

      await firestore.collection("users").doc(user.uid).set({
        email: user.email,
        role,
      });

      Alert.alert("נרשמת בהצלחה", `ברוך הבא, ${user.email}`);
      navigation.navigate("Home");
    } catch (error: any) {
      console.error(error);
      Alert.alert("שגיאה בהרשמה", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>הרשמה</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Text style={styles.backText}>← חזרה</Text>
      </TouchableOpacity>


      <TextInput
        style={styles.input}
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>בחר תפקיד:</Text>
      <View style={styles.roles}>
        <TouchableOpacity
          style={[styles.roleButton, role === "trainer" && styles.selectedRole]}
          onPress={() => setRole("trainer")}
        >
          <Text style={styles.roleText}>מאמן</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "trainee" && styles.selectedRole]}
          onPress={() => setRole("trainee")}
        >
          <Text style={styles.roleText}>מתאמן</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="הרשם"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        buttonStyle={styles.registerButton}
        containerStyle={styles.buttonContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlign: "right",
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  roles: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2675d7",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "#2675d7",
    color: "#fff",
  },
  roleText: {
    
    color: "#000",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#2675d7",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  backButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    padding: 10,
  },
  
  backText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  
});
