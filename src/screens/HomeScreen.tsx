import React from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList"; // <- זה הנתיב הנכון שלך!
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { AccessibleText } from '../components/common/AccessibleText';
import { AccessibleButton } from '../components/common/AccessibleButton';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <AccessibleText
        accessibilityRole="header"
        style={[styles.title, { color: theme.colors.primary }]}
      >
        {t('screens.home.welcome', { appName: t('appName') })}
      </AccessibleText>
      <AccessibleText style={styles.subtitle}>
        האפליקציה שלך לכושר, מוטיבציה וליווי אישי.
      </AccessibleText>

      <View style={styles.buttonGroup}>
        <AccessibleButton
          title="התחברות"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
          textStyle={styles.buttonText}
          accessibilityHint={t('accessibility.buttonDescription', { action: 'התחברות' })}
        />

        <AccessibleButton
          title="הרשמה"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
          textStyle={styles.buttonText}
          accessibilityHint={t('accessibility.buttonDescription', { action: 'הרשמה' })}
        />
      </View>

      <AccessibleButton
        title={t('screens.profile.title', 'פרופיל')}
        onPress={() => navigation.navigate('Profile')}
        accessibilityHint={t('accessibility.buttonDescription', { action: t('screens.profile.title', 'פרופיל') })}
      />

      <AccessibleButton
        title={t('screens.settings.title', 'הגדרות')}
        onPress={() => navigation.navigate('Settings')}
        accessibilityHint={t('accessibility.buttonDescription', { action: t('screens.settings.title', 'הגדרות') })}
      />

      <AccessibleButton
        title={t('screens.exercises.title', 'תרגילים')}
        onPress={() => navigation.navigate('Exercises')}
        accessibilityHint={t('accessibility.buttonDescription', { action: t('screens.exercises.title', 'תרגילים') })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    gap: 14,
  },
  loginButton: {
    backgroundColor: "#23c9c8", // טורקיז
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#ff6b35", // כתום
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
