import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { AccessibleText } from '../common/AccessibleText';
import { AccessibleButton } from '../common/AccessibleButton';
import { ExerciseSortOptions } from '../../types/exercise';

interface ExerciseSortProps {
  sortOptions: ExerciseSortOptions;
  onSortChange: (sortOptions: ExerciseSortOptions) => void;
}

export const ExerciseSort: React.FC<ExerciseSortProps> = ({ sortOptions, onSortChange }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const sortFields = [
    { field: 'name', label: 'exercise.sort.name' },
    { field: 'category', label: 'exercise.sort.category' },
    { field: 'difficulty', label: 'exercise.sort.difficulty' },
    { field: 'createdAt', label: 'exercise.sort.date' }
  ] as const;

  const toggleDirection = () => {
    onSortChange({
      ...sortOptions,
      direction: sortOptions.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const changeField = (field: ExerciseSortOptions['field']) => {
    onSortChange({
      ...sortOptions,
      field
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
    <View style={styles.container}>
      <AccessibleText
        style={styles.title}
        accessibilityRole="header"
      >
        {t('exercise.sort.title')}
      </AccessibleText>

      <View style={styles.options}>
        {sortFields.map(({ field, label }) => (
          <AccessibleButton
            key={field}
            title={t(label)}
            onPress={() => changeField(field)}
            style={getButtonStyle(sortOptions.field === field)}
            textStyle={getTextStyle(sortOptions.field === field)}
            accessibilityHint={t('accessibility.sortOption', { option: t(label) })}
          />
        ))}

        <AccessibleButton
          title={t(`exercise.sort.${sortOptions.direction}`)}
          onPress={toggleDirection}
          style={styles.directionButton}
          accessibilityHint={t('accessibility.toggleSortDirection')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
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
  directionButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 'auto',
  },
}); 