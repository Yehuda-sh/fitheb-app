import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { AccessibleText } from '../components/common/AccessibleText';
import { AccessibleButton } from '../components/common/AccessibleButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStackParamList'; // ← עדכון כאן!

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AccessibleText
        accessibilityRole="header"
        style={styles.title}
      >
        {t('screens.settings.title', 'הגדרות')}
      </AccessibleText>

      <AccessibleButton
        title={t('screens.settings.language', 'שפה')}
        onPress={() => {}}
        accessibilityHint={t('accessibility.buttonDescription', { action: 'שנה שפה' })}
      />

      <AccessibleButton
        title={t('screens.settings.theme', 'ערכת נושא')}
        onPress={() => {}}
        accessibilityHint={t('accessibility.buttonDescription', { action: 'שנה ערכת נושא' })}
      />

      <AccessibleButton
        title={t('screens.settings.notifications', 'התראות')}
        onPress={() => {}}
        accessibilityHint={t('accessibility.buttonDescription', { action: 'הגדר התראות' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});
