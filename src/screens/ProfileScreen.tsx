// src/screens/ProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, Button } from '@rneui/themed';
import { AccessibleText } from '../components/common/AccessibleText';
import { AccessibleButton } from '../components/common/AccessibleButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';
import { auth } from '../services/firebase';
import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (!user) {
          navigation.replace('Login');
          return;
        }
        const doc = await firestore.collection('users').doc(user.uid).get();
        setProfile({ email: user.email, ...doc.data() });
      } catch (err) {
        Alert.alert('שגיאה', 'לא ניתן לטעון את פרטי המשתמש');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <AccessibleText style={styles.title}>לא נמצאו פרטי משתמש</AccessibleText>
        <AccessibleButton
          title="חזור להתחברות"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AccessibleText accessibilityRole="header" style={styles.title}>
        {t('screens.profile.title', 'פרופיל')}
      </AccessibleText>
      <AccessibleText style={styles.info}>
        {profile.fullName ? `שם: ${profile.fullName}` : ''}
      </AccessibleText>
      <AccessibleText style={styles.info}>
        מייל: {profile.email}
      </AccessibleText>
      <AccessibleText style={styles.info}>
        תפקיד: {profile.role || '---'}
      </AccessibleText>
      <AccessibleButton
        title={t('screens.settings.title', 'הגדרות')}
        onPress={() => navigation.navigate('Settings')}
        accessibilityHint={t('accessibility.buttonDescription', { action: 'עבור להגדרות' })}
        style={{ marginTop: 16 }}
      />
      <Button
        title="התנתק"
        onPress={handleLogout}
        buttonStyle={{ backgroundColor: theme.colors.error, marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

