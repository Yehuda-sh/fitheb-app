import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { AccessibleText } from '../common/AccessibleText';
import { AccessibleButton } from '../common/AccessibleButton';
import { ExerciseFilters as ExerciseFiltersType, ExerciseCategory, ExerciseDifficulty, ExerciseEquipment, ExerciseMuscleGroup } from '../../types/exercise';

interface ExerciseFiltersProps {
  filters: ExerciseFiltersType;
  onFilterChange: (filters: ExerciseFiltersType) => void;
}

export const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const categories: ExerciseCategory[] = ['strength', 'cardio', 'flexibility', 'balance', 'other'];
  const difficulties: ExerciseDifficulty[] = ['beginner', 'intermediate', 'advanced'];
  const equipment: ExerciseEquipment[] = ['none', 'dumbbells', 'barbell', 'kettlebell', 'resistance_band', 'machine', 'other'];
  const muscleGroups: ExerciseMuscleGroup[] = ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full_body', 'other'];

  const toggleCategory = (category: ExerciseCategory) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  const toggleDifficulty = (difficulty: ExerciseDifficulty) => {
    onFilterChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? undefined : difficulty
    });
  };

  const toggleEquipment = (item: ExerciseEquipment) => {
    onFilterChange({
      ...filters,
      equipment: filters.equipment === item ? undefined : item
    });
  };

  const toggleMuscleGroup = (muscle: ExerciseMuscleGroup) => {
    onFilterChange({
      ...filters,
      muscleGroup: filters.muscleGroup === muscle ? undefined : muscle
    });
  };

  const getButtonStyle = (isSelected: boolean): ViewStyle => ({
    ...styles.option,
    backgroundColor: isSelected ? theme.colors.primary : '#f0f0f0'
  });

  const getTextStyle = (isSelected: boolean): TextStyle => ({
    ...styles.optionText,
    color: isSelected ? '#fff' : '#333'
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <AccessibleText
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          {t('exercise.filters.categories')}
        </AccessibleText>
        <View style={styles.options}>
          {categories.map(category => (
            <AccessibleButton
              key={category}
              title={t(`exercise.categories.${category}`)}
              onPress={() => toggleCategory(category)}
              style={getButtonStyle(filters.category === category)}
              textStyle={getTextStyle(filters.category === category)}
              accessibilityHint={t('accessibility.filterOption', { option: t(`exercise.categories.${category}`) })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AccessibleText
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          {t('exercise.filters.difficulty')}
        </AccessibleText>
        <View style={styles.options}>
          {difficulties.map(difficulty => (
            <AccessibleButton
              key={difficulty}
              title={t(`exercise.difficulty.${difficulty}`)}
              onPress={() => toggleDifficulty(difficulty)}
              style={getButtonStyle(filters.difficulty === difficulty)}
              textStyle={getTextStyle(filters.difficulty === difficulty)}
              accessibilityHint={t('accessibility.filterOption', { option: t(`exercise.difficulty.${difficulty}`) })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AccessibleText
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          {t('exercise.filters.equipment')}
        </AccessibleText>
        <View style={styles.options}>
          {equipment.map(item => (
            <AccessibleButton
              key={item}
              title={t(`exercise.equipment.${item}`)}
              onPress={() => toggleEquipment(item)}
              style={getButtonStyle(filters.equipment === item)}
              textStyle={getTextStyle(filters.equipment === item)}
              accessibilityHint={t('accessibility.filterOption', { option: t(`exercise.equipment.${item}`) })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AccessibleText
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          {t('exercise.filters.muscleGroups')}
        </AccessibleText>
        <View style={styles.options}>
          {muscleGroups.map(muscle => (
            <AccessibleButton
              key={muscle}
              title={t(`exercise.muscleGroups.${muscle}`)}
              onPress={() => toggleMuscleGroup(muscle)}
              style={getButtonStyle(filters.muscleGroup === muscle)}
              textStyle={getTextStyle(filters.muscleGroup === muscle)}
              accessibilityHint={t('accessibility.filterOption', { option: t(`exercise.muscleGroups.${muscle}`) })}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
  content: {
    padding: 16,
  },
  section: {
    marginRight: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  optionText: {
    fontSize: 14,
  },
}); 