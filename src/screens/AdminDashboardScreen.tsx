// screens/AdminDashboardScreen.tsx

import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';

import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  // סטייט לסטטיסטיקות
  const [trainerCount, setTrainerCount] = React.useState<number>(0);
  const [traineeCount, setTraineeCount] = React.useState<number>(0);
  const [exerciseCount, setExerciseCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // שליפת מספר המאמנים
        const trainersSnap = await firestore.collection('users').where('role', '==', 'trainer').get();
        setTrainerCount(trainersSnap.size);

        // שליפת מספר המתאמנים
        const traineesSnap = await firestore.collection('users').where('role', '==', 'trainee').get();
        setTraineeCount(traineesSnap.size);

        // שליפת מספר התרגילים
        const exercisesSnap = await firestore.collection('exercises').get();
        setExerciseCount(exercisesSnap.size);

      } catch (error) {
        console.error("שגיאה בשליפת נתונים", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>לוח בקרה - מנהל</Text>
      
      <Card containerStyle={styles.card}>
        <Card.Title>סטטיסטיקות</Card.Title>
        <Card.Divider />
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text h4>{trainerCount}</Text>
              <Text>מאמנים</Text>
            </View>
            <View style={styles.statItem}>
              <Text h4>{traineeCount}</Text>
              <Text>מתאמנים</Text>
            </View>
            <View style={styles.statItem}>
              <Text h4>{exerciseCount}</Text>
              <Text>תרגילים</Text>
            </View>
          </View>
        )}
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>פעולות מהירות</Card.Title>
        <Card.Divider />
        <Button
          title="ניהול מאמנים"
          onPress={() => navigation.navigate('TrainerList')}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="ניהול מתאמנים"
          onPress={() => navigation.navigate('TraineeList')}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="ניהול תרגילים"
          onPress={() => navigation.navigate('Exercises')}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="הגדרות מערכת"
          onPress={() => navigation.navigate('Settings')}
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

export default AdminDashboardScreen;
