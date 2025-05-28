import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { api } from './api';

// הגדרת טיפוסים
export interface VideoUploadResult {
  url: string;
  duration: number;
  size: number;
  thumbnail?: string;
}

export interface VideoServiceError {
  code: string;
  message: string;
}

// קבועים
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_VIDEO_DURATION = 60; // 60 שניות
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];

// פונקציית עזר לבדיקת הרשאות
const checkPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throw {
        code: 'PERMISSION_DENIED',
        message: 'אין הרשאה לגשת לגלריית הוידאו',
      };
    }
  }
  return true;
};

// פונקציית עזר לבדיקת גודל וידאו
const validateVideoSize = (size: number): boolean => {
  if (size > MAX_VIDEO_SIZE) {
    throw {
      code: 'FILE_TOO_LARGE',
      message: 'גודל הוידאו חורג מהמותר (50MB)',
    };
  }
  return true;
};

// פונקציית עזר לבדיקת סוג וידאו
const validateVideoType = (type: string): boolean => {
  if (!ALLOWED_VIDEO_TYPES.includes(type)) {
    throw {
      code: 'INVALID_FILE_TYPE',
      message: 'סוג הקובץ אינו נתמך',
    };
  }
  return true;
};

// פונקציית עזר לבדיקת אורך וידאו
const validateVideoDuration = (duration: number): boolean => {
  if (duration > MAX_VIDEO_DURATION) {
    throw {
      code: 'VIDEO_TOO_LONG',
      message: 'אורך הוידאו חורג מהמותר (60 שניות)',
    };
  }
  return true;
};

// שירות ניהול וידאו
export const videoService = {
  // בחירת וידאו מהגלריה
  async pickVideo(): Promise<ImagePicker.ImagePickerResult> {
    try {
      await checkPermissions();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: MAX_VIDEO_DURATION,
      });

      if (result.canceled) {
        throw {
          code: 'USER_CANCELLED',
          message: 'המשתמש ביטל את בחירת הוידאו',
        };
      }

      return result;
    } catch (error: any) {
      throw {
        code: 'PICKER_ERROR',
        message: error?.message || 'שגיאה בבחירת וידאו',
      };
    }
  },

  // צילום וידאו
  async recordVideo(): Promise<ImagePicker.ImagePickerResult> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw {
          code: 'PERMISSION_DENIED',
          message: 'אין הרשאה לגשת למצלמה',
        };
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: MAX_VIDEO_DURATION,
      });

      if (result.canceled) {
        throw {
          code: 'USER_CANCELLED',
          message: 'המשתמש ביטל את הצילום',
        };
      }

      return result;
    } catch (error: any) {
      throw {
        code: 'CAMERA_ERROR',
        message: error?.message || 'שגיאה בצילום וידאו',
      };
    }
  },

  // העלאת וידאו לשרת
  async uploadVideo(
    uri: string,
    type: string,
    size: number,
    duration: number
  ): Promise<VideoUploadResult> {
    try {
      // בדיקות תקינות
      validateVideoSize(size);
      validateVideoType(type);
      validateVideoDuration(duration);

      // יצירת FormData
      const formData = new FormData();
      formData.append('video', {
        uri,
        type,
        name: 'video.mp4',
      } as any);

      // שליחת הוידאו לשרת
      const response = await api.post<VideoUploadResult>('/upload/video', formData);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    } catch (error: any) {
      throw {
        code: 'UPLOAD_ERROR',
        message: error?.message || 'שגיאה בהעלאת הוידאו',
      };
    }
  },

  // מחיקת וידאו מהשרת
  async deleteVideo(url: string): Promise<void> {
    try {
      const response = await api.delete('/upload/video');

      if (response.error) {
        throw response.error;
      }
    } catch (error: any) {
      throw {
        code: 'DELETE_ERROR',
        message: error?.message || 'שגיאה במחיקת הוידאו',
      };
    }
  },
}; 