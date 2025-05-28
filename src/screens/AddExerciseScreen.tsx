import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';

import { firestore } from '../services/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExercise'>;

const AddExerciseScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    try {
      setLoading(true);
      await firestore.collection('exercises').add({
        name: name.trim(),
        description: description.trim(),
        createdAt: new Date(),
      });
      Alert.alert('הצלחה', 'התרגיל נוסף בהצלחה', [
        { text: 'אישור', onPress: () => navigation.goBack() }
      ]);
      setName('');
      setDescription('');
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בהוספת התרגיל');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text h3 style={styles.title}>הוספת תרגיל חדש</Text>
        <Input
          placeholder="שם התרגיל"
          value={name}
          onChangeText={setName}
          textAlign="right"
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="תיאור התרגיל"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          textAlign="right"
          inputContainerStyle={styles.inputContainer}
        />
        <Button
          title="הוסף תרגיל"
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.buttonContainer}
          buttonStyle={{ backgroundColor: "#23c9c8", borderRadius: 16 }}
          titleStyle={{ fontWeight: "bold", fontSize: 17 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 26,
    color: '#2675d7',
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomWidth: 1.5,
    borderColor: "#23c9c8",
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 16,
  },
});

export default AddExerciseScreen;
