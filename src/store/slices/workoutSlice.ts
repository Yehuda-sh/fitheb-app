import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת טיפוסים
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
  createdBy: string; // ID של המאמן
  assignedTo?: string; // ID של המתאמן
  status: 'draft' | 'active' | 'completed';
  completedAt?: string;
}

interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  isLoading: boolean;
  error: string | null;
}

// מצב התחלתי
const initialState: WorkoutState = {
  workouts: [],
  currentWorkout: null,
  isLoading: false,
  error: null,
};

// יצירת ה-slice
const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    // התחלת טעינת אימונים
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // שמירת רשימת אימונים
    setWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
      state.error = null;
    },
    // הוספת אימון חדש
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    // עדכון אימון קיים
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    // מחיקת אימון
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(w => w.id !== action.payload);
    },
    // הגדרת אימון נוכחי
    setCurrentWorkout: (state, action: PayloadAction<Workout | null>) => {
      state.currentWorkout = action.payload;
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
  setWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  setCurrentWorkout,
  setError,
} = workoutSlice.actions;
export default workoutSlice.reducer; 