import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { AccessibleView } from './AccessibleView';

interface AccessibleButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  loading = false,
  testID,
  ...props
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: disabled ? '#CCCCCC' : (theme?.colors?.primary ?? '#007AFF') },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      {...props}
    >
      <AccessibleView
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: disabled || loading }}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={theme?.colors?.white ?? '#FFFFFF'}
            style={{ marginVertical: 4 }}
          />
        ) : (
          <Text
            style={[
              styles.text,
              { color: disabled ? '#666666' : (theme?.colors?.white ?? '#FFF') },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </AccessibleView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // גובה מינימלי לנגישות
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
