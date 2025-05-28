import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseDetails'>;

const ExerciseDetailsScreen: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const { exerciseId } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* TODO: Add exercise details content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExerciseDetailsScreen; 