import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'EditExercise'>;

const EditExerciseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { exerciseId } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        // שליפה אמיתית מה־firestore
        const doc = await firestore.collection('exercises').doc(exerciseId).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data?.name || '');
          setDescription(data?.description || '');
        } else {
          Alert.alert('שגיאה', 'התרגיל לא נמצא');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('שגיאה', 'אירעה שגיאה בטעינת התרגיל');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleSubmit = async () => {
    if (!name || !description) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    try {
      setLoading(true);
      // עדכון אמיתי ב־firestore
      await firestore.collection('exercises').doc(exerciseId).update({
        name,
        description,
      });
      Alert.alert('הצלחה', 'התרגיל עודכן בהצלחה!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בעדכון התרגיל');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>עריכת תרגיל</Text>
      <Input
        placeholder="שם התרגיל"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="תיאור התרגיל"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button
        title="שמור שינויים"
        onPress={handleSubmit}
        loading={loading}
        containerStyle={styles.buttonContainer}
      />
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
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default EditExerciseScreen;
