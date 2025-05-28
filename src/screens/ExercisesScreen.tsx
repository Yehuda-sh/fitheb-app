// screens/ExercisesScreen.tsx

import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Text, Button, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

type Exercise = {
  id: string;
  name: string;
  type?: string;
  difficulty?: string;
  // אפשר להוסיף שדות נוספים כאן במידת הצורך
};

const ExercisesScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const snap = await firestore.collection('exercises').get();
        setExercises(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise)));
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const renderExercise = ({ item }: { item: Exercise }) => (
    <Card containerStyle={styles.card}>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Text>סוג: {item.type || '---'}</Text>
      <Text>רמת קושי: {item.difficulty || '---'}</Text>
      <Button
        title="ערוך"
        onPress={() => navigation.navigate('EditExercise', { exerciseId: item.id })}
        type="outline"
        containerStyle={{ marginTop: 10 }}
      />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>רשימת תרגילים</Text>
      {/* כפתור הוספה בראש הדף */}
      <Button
        title="הוסף תרגיל"
        onPress={() => navigation.navigate('AddExercise')}
        containerStyle={{ margin: 10 }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderExercise}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { textAlign: 'center', marginVertical: 20 },
  list: { padding: 10 },
  card: { borderRadius: 10, marginBottom: 10 },
});

export default ExercisesScreen;
