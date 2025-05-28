import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';
import { auth } from '../services/firebase';
import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerDashboard'>;

const TrainerDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const doc = await firestore.collection('users').doc(user.uid).get();
        setProfile({ email: user.email, ...doc.data() });
      } catch (err) {
        Alert.alert('שגיאה', 'לא ניתן לטעון את פרטי המשתמש');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: profile?.photoURL || 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Button
          title="התנתק"
          type="clear"
          onPress={handleLogout}
          titleStyle={{ color: theme.colors.error }}
        />
      </View>

      <Text h3 style={styles.title}>לוח בקרה - מאמן</Text>

      <Card containerStyle={styles.card}>
        <Card.Title>סטטיסטיקות</Card.Title>
        <Card.Divider />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text h4>0</Text>
            <Text>חניכים</Text>
          </View>
          <View style={styles.statItem}>
            <Text h4>0</Text>
            <Text>תרגילים</Text>
          </View>
          <View style={styles.statItem}>
            <Text h4>0</Text>
            <Text>אימונים</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>פעולות מהירות</Card.Title>
        <Card.Divider />
        <Button
          title="הוסף חניך חדש"
          onPress={() => navigation.navigate('AddTrainee', { trainerId: profile?.uid || '' })}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="ניהול תרגילים"
          onPress={() => navigation.navigate('Exercises')}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="עדכון פרופיל"
          onPress={() => navigation.navigate('TrainerProfile', { trainerId: profile?.uid || '' })}
          containerStyle={styles.buttonContainer}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 20,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ccc',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 5,
  },
});

export default TrainerDashboardScreen;
