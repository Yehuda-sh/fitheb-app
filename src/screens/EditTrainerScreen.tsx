import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTrainer'>;

const EditTrainerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { trainerId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch trainer details
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        // TODO: Implement fetch trainer logic
        setName('מאמן לדוגמה');
        setEmail('trainer@example.com');
        setPhone('050-1234567');
        setSpecialty('כושר גופני');
      } catch (error) {
        Alert.alert('שגיאה', 'אירעה שגיאה בטעינת פרטי המאמן');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !specialty) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement update trainer logic
      Alert.alert('הצלחה', 'פרטי המאמן עודכנו בהצלחה');
      navigation.goBack();
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בעדכון פרטי המאמן');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text h3 style={styles.title}>עריכת פרטי מאמן</Text>
      
      <Input
        placeholder="שם מלא"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="טלפון"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="תחום התמחות"
        value={specialty}
        onChangeText={setSpecialty}
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

export default EditTrainerScreen;
