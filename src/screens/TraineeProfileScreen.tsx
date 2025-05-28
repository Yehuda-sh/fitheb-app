import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../services/firebase";
import { firestore } from "../services/firestore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList"; // ודא שהנתיב נכון

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
      .then(doc => setUserData(doc.data()))
      .catch(() => {
        Alert.alert("שגיאה", "לא נמצאו נתונים למשתמש.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>טוען נתונים...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>לא נמצאו נתונים למשתמש.</Text>
        <Button title="התנתק" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          userData.photoURL
            ? { uri: userData.photoURL }
            : require("../assets/avatar_default.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{userData.displayName || "משתמש ללא שם"}</Text>
      <Text style={styles.email}>{userData.email}</Text>
      <Button
        title="התנתק"
        onPress={handleLogout}
        buttonStyle={styles.logoutButton}
      />
      {/* כאן אפשר להרחיב – היסטוריית אימונים, מדדים, פרטים אישיים וכו' */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 26,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#fa7132",
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginTop: 10,
  },
});
