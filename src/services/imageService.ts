import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { api } from './api';

// הגדרת טיפוסים
export interface ImageUploadResult {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface ImageServiceError {
  code: string;
  message: string;
}

// קבועים
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// פונקציית עזר לבדיקת הרשאות
const checkPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throw {
        code: 'PERMISSION_DENIED',
        message: 'אין הרשאה לגשת לגלריית התמונות',
      };
    }
  }
  return true;
};

// פונקציית עזר לבדיקת גודל תמונה
const validateImageSize = (size: number): boolean => {
  if (size > MAX_IMAGE_SIZE) {
    throw {
      code: 'FILE_TOO_LARGE',
      message: 'גודל התמונה חורג מהמותר (5MB)',
    };
  }
  return true;
};

// פונקציית עזר לבדיקת סוג תמונה
const validateImageType = (type: string): boolean => {
  if (!ALLOWED_IMAGE_TYPES.includes(type)) {
    throw {
      code: 'INVALID_FILE_TYPE',
      message: 'סוג הקובץ אינו נתמך',
    };
  }
  return true;
};

// שירות ניהול תמונות
export const imageService = {
  // בחירת תמונה מהגלריה
  async pickImage(): Promise<ImagePicker.ImagePickerResult> {
    try {
      await checkPermissions();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled) {
        throw {
          code: 'USER_CANCELLED',
          message: 'המשתמש ביטל את בחירת התמונה',
        };
      }

      return result;
    } catch (error: any) {
      throw {
        code: 'PICKER_ERROR',
        message: error?.message || 'שגיאה בבחירת תמונה',
      };
    }
  },

  // צילום תמונה
  async takePhoto(): Promise<ImagePicker.ImagePickerResult> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw {
          code: 'PERMISSION_DENIED',
          message: 'אין הרשאה לגשת למצלמה',
        };
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
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
        message: error?.message || 'שגיאה בצילום תמונה',
      };
    }
  },

  // העלאת תמונה לשרת
  async uploadImage(
    uri: string,
    type: string,
    size: number
  ): Promise<ImageUploadResult> {
    try {
      // בדיקות תקינות
      validateImageSize(size);
      validateImageType(type);

      // יצירת FormData
      const formData = new FormData();
      formData.append('image', {
        uri,
        type,
        name: 'image.jpg',
      } as any);

      // שליחת התמונה לשרת
      const response = await api.post<ImageUploadResult>('/upload/image', formData);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    } catch (error: any) {
      throw {
        code: 'UPLOAD_ERROR',
        message: error?.message || 'שגיאה בהעלאת התמונה',
      };
    }
  },

  // מחיקת תמונה מהשרת
  async deleteImage(url: string): Promise<void> {
    try {
      const response = await api.delete('/upload/image');

      if (response.error) {
        throw response.error;
      }
    } catch (error: any) {
      throw {
        code: 'DELETE_ERROR',
        message: error?.message || 'שגיאה במחיקת התמונה',
      };
    }
  },
}; 