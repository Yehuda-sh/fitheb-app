// src/screens/TrainerProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Avatar, Button, Input, Text, useTheme } from '@rneui/themed';
// import { useNavigation } from '@react-navigation/native'; // מיותר!
import { auth } from '../services/firebase';
import { firestore } from '../services/firestore';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList'; // ← עדכון נתיב

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProfile'>;

export default function TrainerProfileScreen({ navigation }: Props) {
  const { theme } = useTheme();
  // const nav = useNavigation(); // מיותר!
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [trainees, setTrainees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        setTrainerId(user.uid);

        const docSnap = await getDoc(doc(firestore, 'users', user.uid));
        const data = docSnap.data();
        if (data) {
          setName(data.fullName || '');
          setPhone(data.phone || '');
          setImageUrl(data.photoUrl || '');
        }

        const q = query(
          collection(firestore, 'users'),
          where('trainerId', '==', user.uid),
          where('role', '==', 'trainee')
        );

        const traineeDocs = await getDocs(q);
        const traineeList = traineeDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrainees(traineeList);
      } catch (err) {
        Alert.alert('שגיאה', 'שגיאה בטעינת נתונים');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!trainerId) return;
    try {
      await updateDoc(doc(firestore, 'users', trainerId), {
        fullName: name,
        phone: phone,
      });
      Alert.alert('עודכן בהצלחה');
    } catch (err) {
      Alert.alert('שגיאה', 'שגיאה בעדכון הפרופיל');
    }
  };

  const handleDeleteTrainee = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'users', id));
      setTrainees(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      Alert.alert('שגיאה', 'שגיאה במחיקת חניך');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 100 }} />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          size="large"
          source={imageUrl ? { uri: imageUrl } : undefined}
          title={name?.charAt(0)?.toUpperCase() || 'M'}
          containerStyle={{ backgroundColor: theme.colors.primary }}
        />
      </View>

      <Text h3 style={styles.title}>פרופיל מאמן</Text>

      <Input placeholder="שם מלא" value={name} onChangeText={setName} />
      <Input placeholder="טלפון" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Button
        title="שמור שינויים"
        onPress={handleSave}
        containerStyle={styles.button}
      />

      <Text style={styles.sectionTitle}>המתאמנים שלי ({trainees.length})</Text>
      <FlatList
        data={trainees}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.traineeCard}>
            <Text style={styles.traineeName}>{item.fullName || item.email}</Text>
            <Text>טלפון: {item.phone || '---'}</Text>
            <Text>מטרה: {item.goal || '---'}</Text>
            <Button
              title="מחק"
              type="clear"
              titleStyle={{ color: theme.colors.error }}
              onPress={() => {
                Alert.alert('אישור מחיקה', `למחוק את ${item.fullName}?`, [
                  { text: 'ביטול', style: 'cancel' },
                  { text: 'מחק', style: 'destructive', onPress: () => handleDeleteTrainee(item.id) }
                ]);
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 10 },
  title: { textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  button: { marginBottom: 20 },
  traineeCard: {
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  traineeName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
