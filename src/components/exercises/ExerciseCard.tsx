import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { AccessibleText } from '../common/AccessibleText';
import { WebView } from 'react-native-webview';
import { Exercise } from '../../types/exercise';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  onLongPress?: () => void; // אופציונלי
}

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = 200;

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  onLongPress,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Default image if not set
  const imageUrl =
    exercise.imageUrl && exercise.imageUrl.startsWith('http')
      ? exercise.imageUrl
      : 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'; // אייקון דיפולטיבי

  // Extract YouTube video ID if exists
  const extractYouTubeId = (url?: string) => {
    if (!url) return '';
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
    );
    return match ? match[1] : '';
  };

  const videoId = extractYouTubeId(exercise.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?controls=1&mute=1&autoplay=0&loop=1&playlist=${videoId}`
    : '';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.white }]}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={
        t('accessibility.exerciseCard', { name: exercise.name }) ||
        `תרגיל: ${exercise.name}`
      }
      accessibilityHint={
        t('accessibility.exerciseCardHint') || 'הצג פרטי תרגיל'
      }
    >
      {embedUrl ? (
        <WebView
          style={styles.video}
          source={{ uri: embedUrl }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          // הופך אוטומטית ללופ של 5 שניות – אם הסרטון קצר יותר, מתעלם
        />
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={
            t('accessibility.exerciseImage', { name: exercise.name }) ||
            `תמונה של תרגיל ${exercise.name}`
          }
        />
      )}

      <View style={styles.content}>
        <AccessibleText
          style={styles.name}
          accessibilityRole="header"
        >
          {exercise.name}
        </AccessibleText>

        <AccessibleText
          style={styles.description}
          numberOfLines={2}
        >
          {exercise.description}
        </AccessibleText>

        <View style={styles.details}>
          <AccessibleText style={styles.detail}>
            {t(`exercise.difficulty.${exercise.difficulty}`) ||
              exercise.difficulty}
          </AccessibleText>
        </View>

        <View style={styles.tags}>
          <View
            style={[styles.tag, { backgroundColor: theme.colors.primary }]}
          >
            <AccessibleText style={styles.tagText}>
              {t(`exercise.muscleGroups.${exercise.muscleGroup}`) ||
                exercise.muscleGroup}
            </AccessibleText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  video: {
    width: width - 32, // הנחה שיש padding חיצוני
    height: 200,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f2f2f2',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
});
