import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת טיפוסים
export interface ExerciseTemplate {
  id: string;
  name: string;
  nameEn: string;
  muscleGroup: string;
  muscleGroupEn: string;
  equipment: string;
  description: string;
  descriptionEn: string;
  image?: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
  createdBy: string; // ID של המאמן
}

interface ExerciseState {
  exercises: ExerciseTemplate[];
  currentExercise: ExerciseTemplate | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    muscleGroup?: string;
    equipment?: string;
    difficulty?: string;
    searchQuery?: string;
  };
}

// מצב התחלתי
const initialState: ExerciseState = {
  exercises: [],
  currentExercise: null,
  isLoading: false,
  error: null,
  filters: {},
};

// יצירת ה-slice
const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    // התחלת טעינת תרגילים
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // שמירת רשימת תרגילים
    setExercises: (state, action: PayloadAction<ExerciseTemplate[]>) => {
      state.exercises = action.payload;
      state.error = null;
    },
    // הוספת תרגיל חדש
    addExercise: (state, action: PayloadAction<ExerciseTemplate>) => {
      state.exercises.push(action.payload);
    },
    // עדכון תרגיל קיים
    updateExercise: (state, action: PayloadAction<ExerciseTemplate>) => {
      const index = state.exercises.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    // מחיקת תרגיל
    deleteExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(e => e.id !== action.payload);
    },
    // הגדרת תרגיל נוכחי
    setCurrentExercise: (state, action: PayloadAction<ExerciseTemplate | null>) => {
      state.currentExercise = action.payload;
    },
    // עדכון פילטרים
    setFilters: (state, action: PayloadAction<ExerciseState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // ניקוי פילטרים
    clearFilters: (state) => {
      state.filters = {};
    },
    // שמירת שגיאה
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// ייצוא ה-actions וה-reducer
export const {
  setLoading,
  setExercises,
  addExercise,
  updateExercise,
  deleteExercise,
  setCurrentExercise,
  setFilters,
  clearFilters,
  setError,
} = exerciseSlice.actions;
export default exerciseSlice.reducer; 