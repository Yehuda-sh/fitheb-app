// src/screens/TrainerListScreen.tsx

import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

// מגדירים ממשק מאמן - אפשר להרחיב בעתיד
interface Trainer {
  id: string;
  name: string;
  specialty?: string;
  experienceYears?: number;
  traineesCount?: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerList'>;

const TrainerListScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [trainers, setTrainers] = React.useState<Trainer[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // בעתיד - שליפה מה-DB (כעת, דמו)
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        // כאן תבצע שליפה מה-DB שלך בעתיד
        // כרגע - דמו
        setTrainers([
          { id: '1', name: 'יהודה כהן', specialty: 'כושר פונקציונלי', experienceYears: 8, traineesCount: 21 },
          { id: '2', name: 'שירה ברק', specialty: 'פילאטיס', experienceYears: 5, traineesCount: 15 },
          { id: '3', name: 'רועי לוי', specialty: 'אימוני כוח', experienceYears: 10, traineesCount: 28 },
        ]);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  // פונקציה שמציגה כל כרטיס מאמן
  const renderTrainer = ({ item }: { item: Trainer }) => (
    <Card containerStyle={styles.card}>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Text>תחום התמחות: {item.specialty || '—'}</Text>
      <Text>ניסיון: {item.experienceYears ?? 0} שנים</Text>
      <Text>חניכים: {item.traineesCount ?? 0}</Text>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>רשימת מאמנים</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={trainers}
          renderItem={renderTrainer}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30 }}>לא נמצאו מאמנים</Text>}
        />
      )}
    </View>
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
  list: {
    padding: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default TrainerListScreen;
