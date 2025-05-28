import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../services/firebase";
import { firestore } from "../services/firestore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "TraineeProfile">;

export default function TraineeProfileScreen({ navigation }: Props) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigation.replace("Login");
      return;
    }
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => setUserData(doc.data()))
      .catch(() => {
        Alert.alert("שגיאה", "לא נמצאו נתונים למשתמש.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace("Login");
  };

  const handleDashboard = () => {
    navigation.replace("TraineeDashboard");
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>לא נמצאו נתונים למשתמש.</Text>
        <Button title="התנתק" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={
          userData.photoURL
            ? { uri: userData.photoURL }
            : userData.avatar
            ? { uri: userData.avatar }
            : userData.url
            ? { uri: userData.url }
            : require("../assets/avatar_default.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>
        {userData.displayName || userData.fullName || "משתמש ללא שם"}
      </Text>
      <Text style={styles.email}>{userData.email}</Text>

      <View style={styles.statsCard}>
        <Text style={styles.statsLabel}>מטרה:</Text>
        <Text style={styles.statsValue}>{userData.goal || "לא הוגדרה"}</Text>
        <Text style={styles.statsLabel}>גיל:</Text>
        <Text style={styles.statsValue}>{userData.age || "---"}</Text>
        <Text style={styles.statsLabel}>גובה:</Text>
        <Text style={styles.statsValue}>
          {userData.heightCm ? `${userData.heightCm} ס״מ` : "---"}
        </Text>
        <Text style={styles.statsLabel}>משקל:</Text>
        <Text style={styles.statsValue}>
          {userData.weightKg ? `${userData.weightKg} ק״ג` : "---"}
        </Text>
        <Text style={styles.statsLabel}>אימונים שבוצעו:</Text>
        <Text style={styles.statsValue}>{userData.workoutsCount || 0}</Text>
      </View>

      <Button
        title="מעבר ללוח בקרה"
        onPress={handleDashboard}
        buttonStyle={styles.dashboardButton}
        containerStyle={{ marginTop: 22, width: "90%" }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      />

      <Button
        title="התנתק"
        onPress={handleLogout}
        buttonStyle={styles.logoutButton}
        containerStyle={{ marginTop: 10, width: "90%" }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f7fa",
    direction: "rtl",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 22,
    backgroundColor: "#ececec",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2675d7",
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    color: "#444",
    marginBottom: 22,
    textAlign: "center",
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    alignItems: "center",
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2675d7",
    marginTop: 4,
  },
  statsValue: {
    fontSize: 16,
    color: "#222",
    marginBottom: 4,
  },
  dashboardButton: {
    backgroundColor: "#23c9c8",
    borderRadius: 16,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: "#fa7132",
    borderRadius: 16,
    paddingVertical: 12,
  },
});
