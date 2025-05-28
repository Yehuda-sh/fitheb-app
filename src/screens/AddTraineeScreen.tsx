import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';

import { auth } from '../services/firebase';
import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTrainee'>;

const AddTraineeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [trainerId, setTrainerId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setTrainerId(user.uid);
    } else {
      Alert.alert('שגיאה', 'אין משתמש מחובר');
      navigation.replace('Login');
    }
  }, []);

  const handleAdd = async () => {
    if (!fullName || !age || !height || !weight || !goal) {
      Alert.alert('שגיאה', 'נא למלא את כל הפרטים');
      return;
    }

    if (!trainerId) {
      Alert.alert('שגיאה', 'לא ניתן לאתר את מזהה המאמן');
      return;
    }

    try {
      setLoading(true);
      await firestore.collection('users').add({
        fullName,
        age: parseInt(age),
        heightCm: parseInt(height),
        weightKg: parseInt(weight),
        goal,
        role: 'trainee',
        trainerId,
        createdAt: new Date(),
      });

      Alert.alert('הצלחה', 'המתאמן נוסף בהצלחה');
      navigation.goBack();
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בעת שמירת הנתונים');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>הוספת מתאמן חדש</Text>

      <TextInput
        style={styles.input}
        placeholder="שם מלא"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="גיל"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="גובה (ס״מ)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="משקל (ק״ג)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="מטרה"
        value={goal}
        onChangeText={setGoal}
      />

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button
          title="הוסף מתאמן"
          onPress={handleAdd}
          containerStyle={styles.buttonContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddTraineeScreen;
