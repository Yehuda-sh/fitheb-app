import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, I18nManager } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "RoleSelect">;

export default function RoleSelectScreen({ navigation }: Props) {
  // RTL תמיכה – כלול אם עוד לא הגדרת בכל האפליקציה
  React.useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  const handleSelectRole = (role: "trainer" | "trainee") => {
    navigation.navigate("Login", { role }); // שולח את התפקיד ל־Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מי אתה?</Text>
      <Text style={styles.subtitle}>בחר את סוג המשתמש שלך:</Text>
      <Text style={styles.info}>
        תוכל לבחור אחת מהאפשרויות ולהמשיך להתחברות. ניתן להחליף תפקיד במסך הראשי.
      </Text>

      <TouchableOpacity
        style={styles.buttonTrainer}
        onPress={() => handleSelectRole("trainer")}
        accessibilityLabel="כניסה כמאמן"
      >
        <Text style={styles.buttonText}>אני מאמן</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonAthlete}
        onPress={() => handleSelectRole("trainee")}
        accessibilityLabel="כניסה כמתאמן"
      >
        <Text style={styles.buttonText}>אני מתאמן</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    direction: "rtl",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1b1f3b",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 15,
    color: "#666",
    marginBottom: 28,
    textAlign: "center",
    maxWidth: 320,
  },
  buttonTrainer: {
    backgroundColor: "#23c9c8",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 18,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonAthlete: {
    backgroundColor: "#2675d7",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
