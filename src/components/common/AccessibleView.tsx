import React from 'react';
import {
  View,
  ViewProps,
  AccessibilityProps,
  StyleSheet,
} from 'react-native';

interface AccessibleViewProps extends ViewProps, AccessibilityProps {
  testID?: string;
}

export const AccessibleView: React.FC<AccessibleViewProps> = ({
  children,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  accessibilityState,
  accessibilityActions,
  onAccessibilityAction,
  importantForAccessibility,
  testID,
  ...props
}) => (
  <View
    style={[styles.container, style]}
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
    accessibilityState={accessibilityState}
    accessibilityActions={accessibilityActions}
    onAccessibilityAction={onAccessibilityAction}
    importantForAccessibility={importantForAccessibility}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
