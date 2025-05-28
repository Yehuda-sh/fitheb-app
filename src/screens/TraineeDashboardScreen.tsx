// src/screens/TraineeDashboardScreen.tsx

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { auth } from "../services/firebase";
import { firestore } from "../services/firestore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "TraineeDashboard">;

export default function TraineeDashboardScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<any>(null);

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
      .catch(() => setUserData(null));
  }, []);

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>לא נמצא מידע על המשתמש.</Text>
        <Button
          title="חזור להתחברות"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
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
      <Text style={styles.title}>
        שלום, {userData.displayName || userData.fullName || "מתאמן"}
      </Text>
      <Text style={styles.info}>ברוך הבא ללוח הבקרה שלך</Text>
      {/* מידע רלוונטי למתאמן */}
      <Button
        title="מעבר לאימון"
        onPress={() => navigation.navigate("Workout", { workoutIdx: 0 })}
        buttonStyle={styles.actionButton}
      />
      <Button
        title="התנתק"
        onPress={async () => {
          await auth.signOut();
          navigation.replace("Login");
        }}
        buttonStyle={styles.logoutButton}
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
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 18,
    backgroundColor: "#ececec",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2675d7",
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  actionButton: {
    backgroundColor: "#23c9c8",
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: 10,
    minWidth: 200,
  },
  logoutButton: {
    backgroundColor: "#fa7132",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
});
