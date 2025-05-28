// screens/TraineeListScreen.tsx

import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList'; // ← הנתיב החדש שלך
import { firestore } from '../services/firestore';

// טיפוס מתאמן
type Trainee = {
  id: string;
  name?: string;
  email: string;
  trainerName?: string;
  // אפשר להוסיף שדות כרצונך
};

type Props = NativeStackScreenProps<RootStackParamList, 'TraineeList'>;

const TraineeListScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [trainees, setTrainees] = React.useState<Trainee[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTrainees = async () => {
      try {
        setLoading(true);
        const snap = await firestore.collection('users').where('role', '==', 'trainee').get();
        setTrainees(
          snap.docs.map(
            doc => ({ id: doc.id, ...(doc.data() as Omit<Trainee, 'id'>) })
          )
        );
      } catch (error) {
        console.error('Error fetching trainees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  // הקפד על טיפוס!
  const renderTrainee = ({ item }: { item: Trainee }) => (
    <Card containerStyle={styles.card}>
      <Card.Title>{item.name || item.email}</Card.Title>
      <Card.Divider />
      <Text>אימייל: {item.email}</Text>
      <Text>מאמן: {item.trainerName || '---'}</Text>
      {/* הוסף כאן שדות נוספים אם תרצה */}
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>רשימת מתאמנים</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={trainees}
          renderItem={renderTrainee}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>אין מתאמנים להצגה.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { textAlign: 'center', marginVertical: 20, fontWeight: 'bold', fontSize: 22, color: '#2675d7' },
  list: { padding: 10 },
  card: { borderRadius: 10, marginBottom: 10 },
});

export default TraineeListScreen;
