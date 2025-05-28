import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter, DocumentSnapshot, increment, Query, CollectionReference } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { Exercise, ExerciseFilters, ExerciseSortOptions } from '../types/exercise';
import { api } from './api';
import { imageService } from './imageService';
import { videoService } from './videoService';

const EXERCISES_COLLECTION = 'exercises';
const EXERCISES_STORAGE_PATH = 'exercises';

class ExerciseService {
  // קבלת תרגילים עם פילטרים ומיון
  async getExercises(
    filters: ExerciseFilters = {},
    sortOptions: ExerciseSortOptions = { field: 'name', direction: 'asc' },
    pageSize: number = 10,
    lastDoc: any = null
  ) {
    try {
      let q: Query = collection(db, EXERCISES_COLLECTION);

      // הוספת פילטרים
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }
      if (filters.equipment) {
        q = query(q, where('equipment', '==', filters.equipment));
      }
      if (filters.muscleGroup) {
        q = query(q, where('muscleGroup', '==', filters.muscleGroup));
      }

      // הוספת מיון
      q = query(q, orderBy(sortOptions.field, sortOptions.direction));

      // הוספת הגבלת מספר תוצאות
      q = query(q, limit(pageSize));

      // הוספת נקודת התחלה לדפדוף
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const exercises: Exercise[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        exercises.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Exercise);
      });

      return {
        exercises,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
      };
    } catch (error) {
      console.error('Error getting exercises:', error);
      throw error;
    }
  }

  // קבלת תרגיל לפי מזהה
  async getExerciseById(id: string): Promise<Exercise> {
    try {
      const docRef = doc(db, EXERCISES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Exercise not found');
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Exercise;
    } catch (error) {
      console.error('Error getting exercise:', error);
      throw error;
    }
  }

  // יצירת תרגיל חדש
  async createExercise(exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'views'>): Promise<Exercise> {
    try {
      // העלאת תמונה
      let imageUrl = exercise.imageUrl;
      if (imageUrl) {
        const imageRef = ref(storage, `${EXERCISES_STORAGE_PATH}/${Date.now()}_${Math.random().toString(36).substring(7)}`);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      // העלאת וידאו אם קיים
      let videoUrl = exercise.videoUrl;
      if (videoUrl) {
        const videoRef = ref(storage, `${EXERCISES_STORAGE_PATH}/${Date.now()}_${Math.random().toString(36).substring(7)}`);
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        await uploadBytes(videoRef, blob);
        videoUrl = await getDownloadURL(videoRef);
      }

      const newExercise = {
        ...exercise,
        imageUrl,
        videoUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        views: 0
      };

      const docRef = await addDoc(collection(db, EXERCISES_COLLECTION), newExercise);
      return {
        id: docRef.id,
        ...newExercise
      };
    } catch (error: any) {
      throw new Error(`שגיאה ביצירת תרגיל: ${error.message}`);
    }
  }

  // עדכון תרגיל
  async updateExercise(id: string, exercise: Partial<Exercise>): Promise<void> {
    try {
      const docRef = doc(db, EXERCISES_COLLECTION, id);
      const currentExercise = await this.getExerciseById(id);

      // טיפול בתמונה חדשה
      let imageUrl = currentExercise.imageUrl;
      if (exercise.imageUrl) {
        // מחיקת תמונה ישנה
        if (currentExercise.imageUrl) {
          const imageRef = ref(storage, currentExercise.imageUrl);
          await deleteObject(imageRef);
        }

        // העלאת תמונה חדשה
        const imageRef = ref(storage, `${EXERCISES_STORAGE_PATH}/${Date.now()}_${Math.random().toString(36).substring(7)}`);
        const response = await fetch(exercise.imageUrl);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      // טיפול בוידאו חדש
      let videoUrl = currentExercise.videoUrl;
      if (exercise.videoUrl && exercise.videoUrl !== currentExercise.videoUrl) {
        // מחיקת וידאו ישן
        if (currentExercise.videoUrl) {
          const videoRef = ref(storage, currentExercise.videoUrl);
          await deleteObject(videoRef);
        }

        // העלאת וידאו חדש
        const videoRef = ref(storage, `${EXERCISES_STORAGE_PATH}/${Date.now()}_${Math.random().toString(36).substring(7)}`);
        const response = await fetch(exercise.videoUrl);
        const blob = await response.blob();
        await uploadBytes(videoRef, blob);
        videoUrl = await getDownloadURL(videoRef);
      }

      await updateDoc(docRef, {
        ...exercise,
        imageUrl,
        videoUrl,
        updatedAt: new Date()
      });
    } catch (error: any) {
      throw new Error(`שגיאה בעדכון תרגיל: ${error.message}`);
    }
  }

  // מחיקת תרגיל
  async deleteExercise(id: string): Promise<void> {
    try {
      const exercise = await this.getExerciseById(id);
      const docRef = doc(db, EXERCISES_COLLECTION, id);

      // מחיקת תמונה
      if (exercise.imageUrl) {
        const imageRef = ref(storage, exercise.imageUrl);
        await deleteObject(imageRef);
      }

      // מחיקת וידאו
      if (exercise.videoUrl) {
        const videoRef = ref(storage, exercise.videoUrl);
        await deleteObject(videoRef);
      }

      await deleteDoc(docRef);
    } catch (error: any) {
      throw new Error(`שגיאה במחיקת תרגיל: ${error.message}`);
    }
  }

  // הוספת לייק לתרגיל
  async likeExercise(id: string): Promise<void> {
    try {
      const docRef = doc(db, EXERCISES_COLLECTION, id);
      await updateDoc(docRef, {
        likes: increment(1)
      });
    } catch (error: any) {
      throw new Error(`שגיאה בהוספת לייק: ${error.message}`);
    }
  }

  // עדכון מספר צפיות
  async incrementViews(id: string): Promise<void> {
    try {
      const docRef = doc(db, EXERCISES_COLLECTION, id);
      await updateDoc(docRef, {
        views: increment(1)
      });
    } catch (error: any) {
      throw new Error(`שגיאה בעדכון צפיות: ${error.message}`);
    }
  }
}

export const exerciseService = new ExerciseService(); 