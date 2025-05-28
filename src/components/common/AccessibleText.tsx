import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  useWindowDimensions,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';

interface AccessibleTextProps extends TextProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'header' | 'link';
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
  testID?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
}

const VARIANT_STYLES = StyleSheet.create({
  h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: 'bold', lineHeight: 28 },
  body1: { fontSize: 16, lineHeight: 24 },
  body2: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
});

export const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  importantForAccessibility,
  testID,
  variant = 'body1',
  ...props
}) => {
  const { t, i18n } = useTranslation();
  const { fontScale } = useWindowDimensions();

  // קביעה אוטומטית של RTL/ LTR לפי שפה נוכחית
  const isRTL = (i18n.dir ? i18n.dir() === 'rtl' : I18nManager.isRTL);

  // בחירת תפקיד נגישות לפי variant
  const role = accessibilityRole || (variant.startsWith('h') ? 'header' : 'text');

  return (
    <Text
      style={[
        VARIANT_STYLES[variant],
        { textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr', transform: [{ scale: Math.min(fontScale, 1.5) }] },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={role}
      importantForAccessibility={importantForAccessibility}
      testID={testID}
      {...props}
    >
      {children}
    </Text>
  );
};
